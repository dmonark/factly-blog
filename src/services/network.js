export function apiCall(method, url, data, successCallback, errorCallback){
  var status = null
	const BASE_URL = "http://localhost:8000/api"
	fetch(BASE_URL + url, {
			method: method,
			mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
			body: JSON.stringify(data)
		}
	)
  .then((response) => {
		status = response.status;
		return response.json()	
	})
  .then((response) => {
		if(status === 200)
			successCallback(response)
		else
			errorCallback(response)
	})
  .catch((error) => errorCallback(error))
}