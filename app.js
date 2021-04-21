const fetch = require('node-fetch')

/**
 * gets the listings from an URL
 * @param {string} url the URL
 * @returns {object} an array with all the listings
 */
exports.getListings = (url) => {
    return new Promise((res, rej) => {
        fetch(url)
            .then(res => res.text())
            .then(string => {
                const temp = string.substr(string.indexOf('window.tmsJson = '))
                const result = temp.substr(17, temp.indexOf(';')-17)
                res(JSON.parse(decodeURIComponent(JSON.parse(result).tmsData.search_results)))
            })
    })
}
