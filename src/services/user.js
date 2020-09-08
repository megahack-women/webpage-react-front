import { get, post, put, remove } from './client/client'

export const getUsers = () => get('/user').then(res => res.data)

export const getUser = (id) => get(`/user/${id}`).then(res => res.data)

export const signUp = (user) => post('/signup', user).then(res => res.data)

export const removeUser = (id) => remove(`/user/${id}`).then(res => res.data)

export const updateUser = (id, user) => put(`/user/${id}`, user).then(res => res.data)

export const getUserData = () => get('/me').then(res => res.data)
