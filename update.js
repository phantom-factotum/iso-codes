const updateIsoCodes = require('./scripts/updateIsoCodes');
const updateSalesTax = require('./scripts/updateSalesTax');

async function main (){
	await updateIsoCodes();
	await updateSalesTax();
}

main();