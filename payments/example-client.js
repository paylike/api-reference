'use strict'

const createClient = require('@paylike/client')

const client = createClient({
	// fetch, // 'node-fetch' or similar fetch implementation if server-side
})

const $iframes = new Set()

window.addEventListener('message', function (e) {
	for (const challenge of iframeChallenges) {
		if (challenge.$iframe.contentWindow !== e.source) continue
		if (typeof e.data !== 'object' || e.data === null || !e.data.hints) {
			continue
		}
		challenge.resolve(e.data)
	}
})

const cardNumberToken = client.tokenize('pcn', '1000100010001000')
const cardCodeToken = client.tokenize('pcsc', '123')
const payment = Promise.all([cardNumberToken, cardCodeToken]).then(
	([cardNumberToken, cardCodeToken]) => ({
		test: {},
		integration: {
			// "public key"
			key: '57d23ce1-b651-4b37-8bfb-d4077c3bbf38',
		},
		amount: {
			// EUR 1.99
			currency: 'EUR',
			exponent: 2,
			value: 199,
		},
		card: {
			number: cardNumberToken,
			expiry: {
				month: 12,
				year: 2099,
			},
			code: cardCodeToken,
		},
	})
)
payment.then((payment) => pay(payment)).then(console.log, console.error)

const supportedChallenges = new Set(['fetch', 'iframe', 'background-iframe'])

function pay(payment, hints = []) {
	const response = client.payments.create(payment, hints)
	const newHints = response.then((response) => {
		if (!Array.isArray(response.challenges)) return []
		const challenges = response.challenges.filter((c) =>
			supportedChallenges.has(c.type)
		)
		if (challenges.length === 0) {
			return Promise.reject(
				new Error(
					'Unable to process payment: required challenges not supported'
				)
			)
		} else {
			return performChallenge(payment, hints, challenges[0])
		}
	})
	return Promise.all([response, newHints]).then(([response, newHints]) => {
		if (response.authorizationId !== undefined) {
			return response.authorizationId
		} else {
			return pay(payment, [...hints, ...newHints])
		}
	})
}

function performChallenge(payment, hints, challenge) {
	switch (challenge.type) {
		case 'fetch': {
			return client.payments
				.create(payment, hints, challenge.path)
				.then((result) => result.hints)
		}
		case 'redirect': {
			/*
			Supporting redirects is usually reserved for
			backend-implementations in which case the redirect itself should
			happen in the frontend. For that reason, the "redirect" challenge
			is not included above in `supportedChallenges`.
			*/
			const init = paylike.payments.create(payment, hints, challenge.path)
			return init.then((init) => {
				location.href = init.url
				return init.hints
			})
		}
		case 'iframe':
		case 'background-iframe': {
			const hidden = challenge.type === 'background-iframe'
			const init = paylike.payments.create(payment, hints, challenge.path)
			let timer
			let iframeChallenge
			const message = init.then(
				(init) =>
					new Promise((resolve) => {
						const {
							url,
							action,
							method,
							width,
							height,
							fields = {},
							timeout,
						} = init
						timer =
							timeout !== undefined &&
							setTimeout(resolve, timeout)
						const name = 'challenge-frame'
						const $iframe = ce('iframe', {
							src: method === 'GET' ? url : undefined,
							name,
							scrolling: 'auto',
							style: {
								border: 'none',
								width: `${width ?? 1}px`,
								height: `${height ?? 1}px`,
								maxWidth: '100%',
								display: hidden ? 'none' : 'block',
							},
						})
						const $ = ce('div', {className: 'modal', resolve}, [
							$iframe,
						])
						iframeChallenge = {$, $iframe, resolve}
						iframeChallenges.add(iframeChallenge)
						document.body.appendChild($)

						if (method === 'POST') {
							const $form = ce(
								'form',
								{
									method,
									action,
									target: name,
									style: {display: 'none'},
								},
								Object.entries(fields).map(([name, value]) =>
									ce('input', {type: 'hidden', name, value})
								)
							)
							document.body.appendChild($form)
							$form.submit()
							document.body.removeChild($form)
						}
					})
			)
			const cleaned = message.then(() => {
				clearTimeout(timer)
				iframeChallenges.delete(iframeChallenge)
				document.body.removeChild(iframeChallenge.$)
			})
			return Promise.all([init, message, cleaned]).then(
				([init, message]) => {
					return [
						...(init.hints || []),
						...((message && message.hints) || []),
					]
				}
			)
		}
		default: {
			throw new Error(`Unsupported challenge type "${challenge.type}"`)
		}
	}
}

function ce(tag, opts = {}, $children = []) {
	const {style = {}, ...attrs} = opts
	const $ = document.createElement(tag)
	Object.assign($, attrs)
	Object.assign($.style, style)
	for (const $child of $children) {
		$.appendChild($child)
	}
	return $
}
