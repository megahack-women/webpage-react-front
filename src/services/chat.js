import axios from 'axios'

const { REACT_APP_API } = process.env

const baseURL = REACT_APP_API || 'http://localhost:9999/'

const client = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export const getMessage = id => {
  return client.get(`/message/${id}`).then(res => res.data)
}

export const postMessage = payload => {
  return client.post('/', payload).then(res => res.data)
}