import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateUser = updatedUser => ({
  type: UPDATE_USER,
  user: updatedUser
})

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/map')
      })
      .catch(error =>
        dispatch(getUser({error})))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(res => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

export const putUser = updatedUser =>
  dispatch => {

    axios.put('/api/users', {user: updatedUser})
      .then(res => dispatch(updateUser(res.data)))
      .catch(err => console.log(err))
  }

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case UPDATE_USER:
      return action.user;
    default:
      return state
  }
}
