const XLSX = require('xlsx')
const fs = require('fs')
const axios = require('axios')
const path = require('path')

const update = true

let xlsxFileName = path.join(__dirname,'../jsons/international-province-codes.xls')
let jsonFileName = path.join(__dirname,'../jsons/codes.json')

async function getFile(){
	// customs and border patrol provides a xlsx file with all international state/province codes
	let xlsxUrl = 'https://www.cbp.gov/sites/default/files/documents/codes_7.xls'
	let stream = fs.createWriteStream(xlsxFileName)
	return await new Promise(async resolve=>{
		stream.on('finish',()=>{
			console.log('Downloaded', jsonFileName)
			resolve(xlsxFileName)
		})
		const response = await axios.get(xlsxUrl,{
			responseType:'stream',
		}).catch(err=>{
			console.log('Error downloading xls file!')
			console.log(err)
			console.log('Error downloading xls file!')
		})
		await response.data.pipe(stream)
	})
	
}
module.exports = async function parseXlsx(){
	let sheet
	try{
		let filename = update ? await getFile() : xlsxFileName
		const table = XLSX.readFile(filename)
		sheet = table.Sheets[table.SheetNames[0]]
	}catch(err){
		if(err.errno === -4058){
			console.error('Excel sheet not found')
			process.exit()
		}
	}
	let provinceCodes = {}
	// go through each row
	let rowRange = XLSX.utils.decode_range(sheet['!ref'])
	for(let rowNum = rowRange.s.r; rowNum <=rowRange.e.r; rowNum++){
		let countryCode = sheet[XLSX.utils.encode_cell({r: rowNum, c: 0})]?.v;
		let provinceCode = sheet[XLSX.utils.encode_cell({r: rowNum, c: 1})]?.v;
		let provinceName = sheet[XLSX.utils.encode_cell({r: rowNum, c: 2})]?.v;
		// remove diacritical/accent characters
		/*found solution here: 
			https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
		*/
		provinceName = provinceName?.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().toLowerCase()
		provinceCodes[provinceName] = { countryCode,provinceCode}
	}
	fs.writeFileSync(jsonFileName,JSON.stringify(provinceCodes,null,2))
	console.log('iso codes updated!\n')
}
// parseXlsx()