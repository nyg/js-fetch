var nygFetch = (function() {

    var nygFetch = {}

    nygFetch.checkAvailability = function(elementId = undefined) {

        if (!self.fetch) {

            const errorMessage = 'Your web browser doesn\'t support the Fetch API, please use a newer one.'

            if (elementId) {
                document.getElementById(elementId).textContent = errorMessage
            }
            else {
                alert(errorMessage)
            }
        }
    }

    nygFetch.fetch = function(url) {
        return fetch(url)
            .then(checkResponseStatus)
            .catch(nygFetch.rethrowError)
    }

    nygFetch.fetchJSON = function(url, external = false) {

        const extUrl = 'https://cors-anywhere.herokuapp.com/' + url

        return nygFetch
            .fetch(external ? extUrl : url)
            .then(response => response.json())
            .catch(nygFetch.rethrowError)
    }

    nygFetch.rethrowError = function(error) {
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
