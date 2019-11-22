export default function request (method, url, params = {}) {
  return axios[method](url, params)
    .then(
      (response) => { return response },
      (response) => { return response }
    )
}
