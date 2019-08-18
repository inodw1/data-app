const url = 'https://jsonplaceholder.typicode.com/';

async function getDataFromServer (reqAPI) {
  let apiGetdata = url.concat(reqAPI);
    try {
      let response = await fetch(apiGetdata, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      return 404;
    }
}

async function insertDataToServer (params, reqAPI) {
    try {
        let apiPostData = url.concat(reqAPI);
        let response = await fetch(apiPostData, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: params.toString(),
        });

        let responseJson = await response.json();
        return responseJson;

    } catch (error) {
        return 404;
    }
}

export {getDataFromServer};
export {insertDataToServer};
