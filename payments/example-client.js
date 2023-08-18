import createClient from 'https://esm.sh/@paylike/client@1.0.0'
// import createClient from @paylike/client (Node.js)

const client = createClient()

const iframeChallenges = new Set()

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
		// mobilepay: {
		// 	configurationId: '00000000000000000000000000000000',
		// 	logo:
		// 		'https://app.paylike.io/apple-touch-icon-114x114-precomposed.png',
		// 	returnUrl: location.href,
		// },
	})
)
payment
	.then((payment) => pay(payment, retrieveHints()))
	.then(console.log, console.error)
	.finally(() => clearHints())

/*
If implementing on the server-side, replace these functions with
database-equivalents.
*/
function retrieveHints() {
	const raw = localStorage.getItem('payment-hints')
	console.log('Retrieved', raw)
	return raw !== null ? JSON.parse(raw) : []
}

function saveHints(hints) {
	console.log('Saving', hints)
	return localStorage.setItem('payment-hints', JSON.stringify(hints))
}

function clearHints() {
	return localStorage.removeItem('payment-hints')
}

function pay(payment, hints = []) {
	saveHints(hints)
	const response = client.payments.create(payment, hints)
	const newHints = response.then((response) => {
		if (!Array.isArray(response.challenges)) return []
		for (const challenge of response.challenges) {
			const newHints = performChallenge(payment, hints, challenge)
			if (newHints !== undefined) {
				return newHints
			}
		}
		return Promise.reject(
			new Error(
				`No supported challenges available: ${response.challenges
					.map((c) => c.type)
					.join(', ')}`
			)
		)
	})
	return Promise.all([response, newHints]).then(([response, newHints]) =>
		response.authorizationId !== undefined
			? response.authorizationId
			: pay(payment, [...hints, ...newHints])
	)
}

function performChallenge(payment, hints, challenge) {
	switch (challenge.type) {
		case 'fetch': {
			return client.payments
				.create(payment, hints, challenge.path)
				.then((result) => result.hints)
		}
		case 'poll': {
			const init = client.payments.create(payment, hints, challenge.path)
			return init.then((init) => {
				if (init.hints.length > 0) {
					return init.hints
				} else {
					const delay = new Date(init.notBefore) - Date.now()
					return new Promise((r) =>
						setTimeout(() => r(init.hints), delay)
					)
				}
			})
		}
		case 'iframe':
		case 'background-iframe': {
			const hidden = challenge.type === 'background-iframe'
			const init = client.payments.create(payment, hints, challenge.path)
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
		case 'redirect': {
			const init = client.payments.create(payment, hints, challenge.path)
			return init.then((init) => {
				location.href = init.url
				return init.hints
			})
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
