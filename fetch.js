var nygFetch = (function () {

    var nygFetch = {}

    nygFetch.hasFetch = function () {
        return self.fetch
    }

    nygFetch.getJSON = function (apiUrl) {
        return fetch(apiUrl).then(checkStatus).then(parseJSON).catch(error)
    }

    function checkStatus(response) {

        if (response.status >= 200 && response.status < 300) {
            return response
        }
        else {
            return new Error(response.statusText)
        }
    }

    function parseJSON(response) {
        return response.json()
    }

    function error(e) {
        console.log("Error: ", e);
    }

    return nygFetch
})()
