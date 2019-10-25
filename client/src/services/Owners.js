import axios from 'axios'
const baseUrl ="/api/companies"

const create = (company_id, owner) => {
  const promise = axios.post(`${baseUrl}/${company_id}/owners/`, owner)
  return promise.then(response => response.data)
}
const deleteOwner = (company_id, id) => {
  const promise = axios.delete(`${baseUrl}/${company_id}/owners/${id}`)
  return promise.then(response =>  response.data)
}

export default { create, deleteOwner }