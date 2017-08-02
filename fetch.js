var nygFetch = (function () {

    var nygFetch = {}

    nygFetch.hasFetch = function () {
        return self.fetch
    }

    nygFetch.fetch = function (url) {
        return fetch(url).then(checkStatus)
    }

    nygFetch.fetchJSON = function (url, external = false) {

        var yqlQuery = encodeURIComponent('select * from json where url="' + url + '"'),
            yqlUrl = 'https://query.yahooapis.com/v1/public/yql?format=json&q=' + yqlQuery

        return nygFetch
            .fetch(external ? yqlUrl : url)
            .then(function (response) {
                return response.json()
            })
            .then(function (json) {
                return external ? json.query.results.json : json
            })
    }

    function checkStatus(response) {

        if (response.status >= 200 && response.status < 300 || response.status == 2) {
            return response
        }
        else {
            console.log('error');
            return new Error('Received response with status: [' + response.status + ', ' + response.statusText + ']')
        }
    }

    return nygFetch
})()
