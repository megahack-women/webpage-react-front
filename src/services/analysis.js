import axios from 'axios'

const { REACT_APP_ANALYSIS_API, REACT_APP_ANALYSIS_API_TOKEN } = process.env

const baseURL = REACT_APP_ANALYSIS_API || 'https://analise-python-service.herokuapp.com/'
const token = REACT_APP_ANALYSIS_API_TOKEN || 'mgw2020'

const client = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

export const postPerson = payload => {
  return client.post('/person', payload).then(res => res.data)
}

export const postGroup = payload => {
  return client.post(`/person/${payload.id}/group`, payload).then(res => res.data)
}