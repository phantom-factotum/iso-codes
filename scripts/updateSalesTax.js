const fs = require('fs')
const axios = require('axios')
const path = require('path')


let currentDir = process.cwd()
let jsonFileName = path.join(__dirname,'../jsons/sales-tax-rates.json')

let salesTaxUrl = 'https://raw.githubusercontent.com/valeriansaliou/node-sales-tax/master/res/sales_tax_rates.json'
module.exports= async function updateSalesTaxJson(){
	await new Promise(async resolve=>{
		let stream = fs.createWriteStream(jsonFileName)
		stream.on('finish',()=>{
			console.log('Downloaded',jsonFileName)
			console.log('Sales tax rates updated!\n')
			resolve()
		})

		const response = await axios.get(salesTaxUrl,{
			responseType:'stream',
		})
		await response.data.pipe(stream)
	})
}