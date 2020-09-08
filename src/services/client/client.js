import axios from 'axios'

const { REACT_APP_API_KEY, REACT_APP_API } = process.env

const token = REACT_APP_API_KEY
const baseURL = REACT_APP_API

const client = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `bearer ${token}`
  }
})

export const get = (endpoint) => client(endpoint).then(res => res.data)

export const post = (endpoint, payload) => client.post(endpoint, payload).then(res => res.data)

export const put = (endpoint, payload) => client.put(endpoint, payload).then(res => res.data)

export const remove = (endpoint) => client.delete(endpoint).then(res => res.data)

export default client
