export default function (url) {
  console.log('fetch ' + url);
  return fetch(url, { cache: 'no-store' })
    .then(response => {
      // console.log(response.status); // 200
      if (response.status != 200) {
        throw new Error('fetch ' + url + ' status: ' + response.status);
      }
      // console.log(response.headers.get('Content-Type')); // application/json; charset=utf-8
      return response.json();
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};