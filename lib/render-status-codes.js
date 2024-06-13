import fs from 'node:fs'
import handlebars from 'handlebars'
import pullStream from 'pull-stream'
import csv from 'csv-parser'
import toPull from 'stream-to-pull-stream'

const {pull, once, collect, map} = pullStream
const template = fs.readFileSync(import.meta.dirname + '/status-codes.hbs', 'utf8')
const data = fs.readFileSync(import.meta.dirname + '/status-codes.csv', 'utf8')

pull(
	once(data),
	toPull.duplex(csv()),
	map((row) => ({
		code: row['Code'],
		codeLower: row['Code'].toLowerCase(),
		description: row['Description'],
		httpStatusCode: parseInt(row['HTTP status code'], 10),
		message: row['Message'],
	})),
	collect((err, responses) => {
		const list = responses.reduce((obj, curr) => {
			obj = `${obj}${curr.code}: "${curr.code}",`
			return obj
		}, '')
		fs.writeFileSync(
			import.meta.dirname + '/../status-codes.md',
			handlebars.compile(template)({responses})
		)
		fs.writeFileSync(
			import.meta.dirname + '/status-codes.json',
			JSON.stringify(responses)
		)
		fs.writeFileSync(
			import.meta.dirname + '/status-codes.js',
			`export default {${list}}`
		)
	})
)
