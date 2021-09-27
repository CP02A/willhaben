# Willhaben API
This module has only tested on `https://willhaben.at`!

## Documentation
There are two ways you can use this API.
Either by entering the URL and let the API extract all the results or by using the builder to build the URL and let the API extract the results.


#### Extract results directly from URL
For this method you need an URL of the willhaben search you want to make. Then you use the .getListings(URL) function and it returns a promise which resolves to an array with all the results.

###### Example
This example searches for `rtx` in the `Grafikkarten` category and will show the first 1000 results.
```javascript
const willhaben = require('willhaben')

willhaben.getListings('https://www.willhaben.at/iad/kaufen-und-verkaufen/marktplatz/pc-komponenten/-5882?keyword=rtx&rows=1000').then(json => {
    console.log(json)
})
```


#### Use builder to build URL and get results
The URL builder is obtainable with the `.new()` function. Then you can use various methods on the object and execute the search with `.search()`. This method returns a promise which resolves to an array containing all the results.

**Available methods in the builder:**
Method | Description
------------ | -------------
.category(int) | sets the category to search (default: all)
.condition(int) | adds a condition to search
.transferType(int) | adds a transfer type to search
.count(int) | sets the count of how many results should be searched for
.paylivery(boolean) | sets if you should search for [PayLivery](https://hilfe.willhaben.at/hc/de/categories/360002297680-PayLivery-Online-Zahlung-und-Versand)
.keyword(string) | sets the keyword to search for (basically a text search)
.getURL() | get URL with the currently set variables
.search() | executes search -> returns Promise

**Getting constants**
There are constants for the categories, conditions, and transfer types. The contants are saved as properties of the module object. Example:
```javascript
const willhaben = require('willhaben')

console.log(willhaben.getCategories.grafikkarten
```
Property | Constant Description
------------ | -------------
.getCategories | get the integer for a category
.getConditions | get the integer for a condition
.getTransferTypes | get the integer for a transfer type


###### Example
This example searches for `rtx` in the `Grafikkarten` category and will show the first 1000 results. (same example as above)
```javascript
const willhaben = require('willhaben')

willhaben.new()
    .keyword('rtx')
    .count(1000) // default is 1000
    .category(willhaben.getCategories.grafikkarten)
    .search().then(json => {
        console.log('test')
        console.log(json)
    })
```