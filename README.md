# iso-code-tax-rates
Get iso-codes for a province/state and the sales tax rate of that region. Built using the json file from [node-sales-tax](https://github.com/valeriansaliou/node-sales-tax), and the xls file from the [Customs and Border Protection](https://www.cbp.gov/document/guidance/international-stateprovince-codes).

## Sample Usage
### getIsoCode({region,isoCountryCode})
  Accepts an object with the keys `region` and `isoCountryCode`. `isoCountryCode` is not required, as currently only region effects the return value. Future code may return all regions for the given isoCountryCode
```js
  const { getIsoCode } = require('iso-codes-tax-rates');
  let region = 'São Paulo'
  let isoCode = getIsoCode({region})
  console.log(isoCode)
 ```
 returns an object containing `{isoRegionCode:String, isoCountryCode:String}`
### useSalesTaxRates({region, isoCountryCode })
  Accepts an object with the keys `region` and `isoCountryCode`. `isoCountryCode` is not required, as currently only region effects the return value. It should be noted that useSalesTaxRates check for a federal level sales tax, and if it exists, then it is added to the region sales tax rate
```js
  const {useSalesTaxRates } = require('iso-codes-tax-rates');
  // useSalesTax calls getIsoCode internally
  let region = 'São Paulo'
  let taxRate = useSalesTaxRates({region})
  console.log(taxRate)
 ```
 returns a Float
 
