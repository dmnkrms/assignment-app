import axios from 'axios'
const baseUrl ="/api/companies"

const getAll = () => {
  const promise = axios.get(baseUrl)
  return promise.then(response => response.data)
}

const getCompany = (id) =>{
  const promise = axios.get(`${baseUrl}/${id}`)
  return promise.then(response => response)
}

const create = company => {
  const promise = axios.post(baseUrl, company)
  return promise.then(response => response.data)
}

const update = (id, company) => {
  const promise = axios.put(`${baseUrl}/${id}`, company)
  return promise.then(response => response.data)
}

const deleteCompany = (id) => {
  const promise = axios.delete(`${baseUrl}/${id}`)
  return promise.then(response =>  response.data)
}

export default { getAll, getCompany, create, update, deleteCompany }