var nygFetch = (function () {

    var nygFetch = {}

    nygFetch.fetch = function (url) {
        return fetch(url).then(checkStatus).catch(e => { throw e })
    }

    nygFetch.fetchJSON = function (url, external = false) {

        var yqlQuery = encodeURIComponent('select * from json where url="' + url + '"'),
            yqlUrl = 'https://query.yahooapis.com/v1/public/yql?format=json&q=' + yqlQuery

        return nygFetch
            .fetch(external ? yqlUrl : url)
            .then(response => response.json())
            .then(json => external ? json.query.results.json : json)
            .catch(e => { throw e })
    }

    function checkStatus(response) {

        if (response.status >= 200 && response.status < 300 || response.status == 2) {
            return response
        }
        else {
            throw new Error('Error: received response with status: [' + response.status + ', "' + response.statusText + '"]')
        }
    }

    return nygFetch
})()
