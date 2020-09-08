import axios from 'axios'

const { REACT_APP_AUTH_API } = process.env

const baseURL = REACT_APP_AUTH_API || 'http://localhost:9000/'

const client = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export const login = user => {
  const credentials = btoa(`${user.email}:${user.password}`)
  client.defaults.headers.authorization = `basic ${credentials}`
  return client.get('/login').then(res => res.data)
}

export const setTokenHeader = token => {
  client.defaults.headers.authorization = `Bearer ${token}`
}

export const removeTokenHeader = () => {
  client.defaults.headers.authorization = ''
}
