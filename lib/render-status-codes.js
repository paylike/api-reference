'use strict'

const fs = require('fs')
const handlebars = require('handlebars')
const { pull, once, collect, map } = require('pull-stream')
const csv = require('csv-parser')
const toPull = require('stream-to-pull-stream')

const template = fs.readFileSync(__dirname + '/status-codes.hbs', 'utf8')
const data = fs.readFileSync(__dirname + '/status-codes.csv', 'utf8')

pull(
	once(data),
	toPull.duplex(csv()),
	map(row => ({
		code: row['Code'],
		codeLower: row['Code'].toLowerCase(),
		description: row['Description'],
		httpStatusCode: row['HTTP status code'],
		message: row['Message'],
	})),
	collect((err, responses) => {
		const list = responses.reduce((obj, curr) => {
			obj = `${obj}${curr.code}: "${curr.code}",`
			return obj
		}, '')
		fs.writeFileSync(__dirname + '/../status-codes.md', handlebars.compile(template)({ responses }))
		fs.writeFileSync(__dirname + '/status-codes.json', JSON.stringify(responses))
		fs.writeFileSync(__dirname + '/status-codes.js', `module.exports = {${list}}`)
	})
)
