import * as isoCodes from './jsons/codes.json'
import * as salesTaxRates from './jsons/sales-tax-rates.json'

export default function useSalesTaxRates({isoCountryCode,region}){
	let regionTaxRate = 0.0
	if(!isoCountryCode && !region)
		return regionTaxRate
	// if region isnt isoCode convert it to iso
	if (region.length > 3 || !isoCodes[region]){
		region = region.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()
		let isoRegionCode = isoCodes[region]
		if(!isoRegionCode)
			return regionTaxRate
		else{
			isoRegionCode = isoRegionCode.provinceCode
			if(!isoCountryCode)
				isoCountryCode = isoRegionCode.countryCode
		}
		if ( isoRegionCode )
			region = isoRegionCode
	}
	console.log(isoCountryCode, region )
	let countryTaxInfo = salesTaxRates[isoCountryCode]
	let countryTaxRate = countryTaxInfo.rate
	if(countryTaxInfo.states)
		regionTaxRate = countryTaxInfo.states[region].rate
	return regionTaxRate + countryTaxRate
}