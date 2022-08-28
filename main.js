const axios = require('axios').default;
const fs = require('fs');
const CC = require('currency-converter-lt');
const country_codes = require('./settings/countryCodes.json');
const config = require('./settings/config.json');


const package_id = config['package_id']
const currency_code = config['currency_code']
const delay = config['delay']

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    fs.writeFile('data.json', JSON.stringify([]), function(error){if(error) {console.log("\x1b[31m%s\x1b[0m", 'Something went wrong, unable to create data file')}});
    const countryes_quantity = country_codes.length
    let response;
    let counter = 1
    let data = []
    console.log(`Total uploaded | ${countryes_quantity}`)
    console.log(`Settings | package_id: ${package_id} | currency_code: ${currency_code} | delay: ${delay}`)
    try {
        while (counter <= countryes_quantity) {
            response = await axios(`https://store.steampowered.com/api/packagedetails/?cc=${country_codes[counter]}&packageids=${package_id}`, {
                headers: {
                    'accept': '*/*',
                    'accept-encoding': 'gzip, deflate, br',
                    'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh;q=0.5',
                    'content-type': 'text/plain',
                    'origin': 'https://store.steampowered.com',
                    'referer': 'https://store.steampowered.com/',
                    'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'cross-site',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
                },
                method: 'GET',
                responseType: 'json'
            })
            let currency = response.data[`${package_id}`]['data']['price']['currency']
            let final_price = response.data[`${package_id}`]['data']['price']['final'] / 100
            let discount_percent = response.data[`${package_id}`]['data']['price']['discount_percent']
            let currencyConverter = new CC({from:`${currency}`, to:`${currency_code}`, amount:final_price, isDecimalComma:false})
            final_price = await currencyConverter.convert()
            data.push({'Currency': currency, 'Price': final_price, 'DiscountPercent': discount_percent})
            console.log("\x1b[32m%s\x1b[0m", `Processed: ${counter} / ${countryes_quantity}`)
            counter = counter + 1
            await sleep(delay)
        }
        fs.writeFile('data.json', JSON.stringify(data), function(error){if(error) {console.log("\x1b[31m%s\x1b[0m", 'Something went wrong, unable to save data to file')}});
        console.log("\x1b[32m%s\x1b[0m", 'Data processing completed. All data is written to the file data.json')
    } catch (e) {
        console.log(e)
        console.log("\x1b[31m%s\x1b[0m", 'Error')
        fs.writeFile('data.json', JSON.stringify(data), function(error){if(error) {console.log("\x1b[31m%s\x1b[0m", 'Something went wrong, unable to save data to file')}});
    }
})()