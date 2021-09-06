const isoCodes = require('./jsons/codes.json');
const salesTaxRates = require('./jsons/sales-tax-rates.json');

const getIsoCode=({isoCountryCode,region})=>{
	let regionCode = region
	// if region isnt isoCode convert it to iso
	if (regionCode.length > 3 || !isoCodes[regionCode]){
		regionCode = regionCode.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()
		let isoCodeInfo = isoCodes[regionCode]
		if(!isoCodeInfo)
			return null
		else{
			regionCode = isoCodeInfo.provinceCode
			if(isoCountryCode != isoCodeInfo.countryCode)
				isoCountryCode = isoCodeInfo.countryCode
			return { isoCountryCode, isoRegionCode:regionCode }
		}
	}
}
const useSalesTaxRates=({isoCountryCode,region})=>{
	let regionTaxRate = 0.0
	if(!isoCountryCode && !region)
		return regionTaxRate

	let isoCode = getIsoCode({isoCountryCode,region})
	if(!isoCode)
		return regionTaxRate
	let countryTaxInfo = salesTaxRates[isoCode.isoCountryCode]
	let countryTaxRate = countryTaxInfo.rate || 0.0
	if(countryTaxInfo.states)
		regionTaxRate = countryTaxInfo.states[isoCode.isoRegionCode].rate
	return regionTaxRate + countryTaxRate
}
exports = {getIsoCode,useSalesTaxRates}
let region = 'São Paulo'
let isoCode = getIsoCode({region})
console.log(isoCode)
let taxRate = useSalesTaxRates({region})
console.log(taxRate)