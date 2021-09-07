# iso-code-tax-rates

Get iso-codes for a province/state and the sales tax rate of that region. Built using the json file from node-sales-tax, and by converting xls file from the Customs and Border Protection into a json.
## Sample Usage
### getIsoCode({region,isoCountryCode})
Accepts an object with the keys region and isoCountryCode. isoCountryCode is not required, as currently only region effects the return value. Future code may return all regions for the given isoCountryCode
```js
  const { getIsoCode } = require('iso-codes-tax-rates');
  let region = 'São Paulo'
  let isoCode = getIsoCode({region})
  console.log(isoCode)
```
returns an object containing {isoRegionCode:String, isoCountryCode:String}


### useSalesTaxRates({region, isoCountryCode })
Accepts an object with the keys region and isoCountryCode. isoCountryCode is not required, as currently only region effects the return value. It should be noted that useSalesTaxRates check for a federal level sales tax, and if it exists, then it is added to the region sales tax rate
```js
  const {useSalesTaxRates } = require('iso-codes-tax-rates');
  // useSalesTax calls getIsoCode internally
  let region = 'São Paulo'
  let taxRate = useSalesTaxRates({region})
  console.log(taxRate)
```
returns a Float


## Updating iso codes and tax rates
This project depends on the information from node-sales-tax and Customs and Border Protection. Should you notice out of date tax rates or iso codes, try running npm run update to update the information