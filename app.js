const fetch = require('node-fetch')

/**
 * gets the listings from an URL
 * @param {string} url the URL
 * @returns {object} an array with all the listings
 */
exports.getListings = getListings

function getListings(url) {
    return new Promise((res, rej) => {
        fetch(url)
            .then(res => res.text())
            .then(string => {
                const temp = string.substr(string.indexOf('<script id="__NEXT_DATA__" type="application/json">') + '<script id="__NEXT_DATA__" type="application/json">'.length)
                const result = JSON.parse(temp.substr(0, temp.indexOf('</script>')))
                const returnArray = []

                result.props.pageProps.searchResult.advertSummaryList.advertSummary.forEach(returnObj => {
                    returnObj.attributes.attribute.forEach(element => {
                        returnObj[element.name.toLowerCase()] = isNaN(element.values[0]) ? element.values[0] : +element.values[0];
                    })

                    // delete useless keys
                    delete returnObj.attributes
                    delete returnObj.contextLinkList
                    delete returnObj.advertiserInfo
                    delete returnObj.advertImageList

                    returnArray.push(returnObj)
                })

                res(returnArray)
            })
    })
}

const categories = Object.freeze({
})
exports.getCategories = categories

const conditions = Object.freeze({
    neu: 22,
    gebraucht: 23,
    defekt: 24,
    neuwertig: 2546,
    ausstellungsstueck: 2539
})
exports.getConditions = conditions

const transferType = Object.freeze({
    selbstabholung: 2536,
    versand: 2537
})
exports.transferType = transferType

exports.new = () => new WillhabenSearch

class WillhabenSearch {
    constructor(){
        this.searchCount = 1000
        this.searchCategory = 0
        this.searchContition = []
        this.searchTransferType = []
    }

    category(category) {
        if(!Object.values(categories).includes(category) || !Number.isInteger(category))
            throw new Error('Invalid category! use .getCategories() on the imported module to get the available categories!')
        this.searchCategory = +category
        return this
    }

    condition(condition) {
        if(!Object.values(conditions).includes(+condition) || !Number.isInteger(condition))
            throw new Error('Invalid condition! use .getConditions() on the imported module to get the available conditions!')
        if(!this.searchContition.includes(+condition)) this.searchContition.push(+condition)
        return this
    }

    transferType(transfer) {
        if(!Object.values(transferTypes).includes(+transfer) || !Number.isInteger(transfer))
            throw new Error('Invalid transfer type! use .getTransfers() on the imported module to get the available types!')
        if(!this.searchTransferType.includes(+transfer)) this.searchTransferType.push(+transfer)
        return this
    }

    count(count) {
        if(!Number.isInteger(count) || count < 1)
            throw new Error('Count has to be a positive integer!')
        this.searchCount = count
        return this
    }
}
