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
