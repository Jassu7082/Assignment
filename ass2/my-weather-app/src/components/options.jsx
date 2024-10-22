const options = {
    method: 'GET',
    url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities/Q60',
    headers: {
      'x-rapidapi-key': 'fee7c4806emsh9aa50f0782ebea0p126d3cjsn92af68e5e03b',
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
    }
  };
  
  try {
      const response = await axios.request(options);
      console.log(response.data);
  } catch (error) {
      console.error(error);
  }