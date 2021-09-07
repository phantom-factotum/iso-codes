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
const getSalesTaxRate=({isoCountryCode,region})=>{
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



// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {getIsoCode, getSalesTaxRate};
}));