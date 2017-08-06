var nygFetch = (function () {

    var nygFetch = {}

    nygFetch.checkAvailability = function (elementId = undefined) {

        if (!self.fetch) {

            var errorMessage = 'Your web browser doesn\'t support the Fetch API, please use a newer one.'

            if (elementId) {
                document.getElementById(elementId).textContent = errorMessage
            }
            else {
                alert(errorMessage)
            }
        }
    }

    nygFetch.fetch = function (url) {
        return fetch(url)
            .then(checkResponseStatus)
            .catch(nyg.rethrowError)
    }

    nygFetch.fetchJSON = function (url, external = false) {

        var yqlQuery = encodeURIComponent('select * from json where url="' + url + '"'),
            yqlUrl = 'https://query.yahooapis.com/v1/public/yql?format=json&q=' + yqlQuery

        return nygFetch
            .fetch(external ? yqlUrl : url)
            .then(response => response.json())
            .then(json => external ? json.query.results.json : json)
            .catch(nyg.rethrowError)
    }

    nygFetch.rethrowError = function (error) {
        throw error
    }

    function checkResponseStatus(response) {

        if (response.status >= 200 && response.status < 300 || response.status == 0) {
            return response
        }
        else {
            throw new Error(`Error: received response with status: [${response.status}, "${response.statusText}"]`)
        }
    }

    return nygFetch
})()
