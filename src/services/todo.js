import { get, post, put, remove } from './client/client'

export const getAllTodo = () => get(`/todo`)

export const getTodo = (id) => get(`/todo/${id}`)

export const postTodo = (todo) => post(`/todo`, todo)

export const updateTodo = (todo) => put(`/todo`, todo)

export const deleteTodo = (id) => remove(`/todo/${id}`)
