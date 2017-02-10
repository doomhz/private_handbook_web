import { isFunction } from 'lodash'
import * as types from './action_types'
import * as service from '../../services/auth'

export const login = (authData)=> (
  async(dispatch, getState) => {
    try {
      const userData = await service.login(authData.email, authData.password)
      dispatch({type: types.SESSION_UPDATED, user: userData})
      dispatch({type: types.LOGIN_ERRORS_UPDATED})
    } catch (error) {
      dispatch({type: types.LOGIN_ERRORS_UPDATED, error: error.message})
    }
  }
)

export const signup = (authData)=> (
  async(dispatch, getState) => {
    try {
      const userData = await service.signup(authData.email, authData.password)
      dispatch({type: types.SESSION_UPDATED, user: userData})
      dispatch({type: types.SIGNUP_ERRORS_UPDATED})
    } catch (error) {
      dispatch({type: types.SIGNUP_ERRORS_UPDATED, error: error.message})
    }
  }
)

export const logout = (authData)=> (
  async(dispatch, getState) => {
    try {
      await service.signOut()
      dispatch({type: types.SESSION_UPDATED})
    } catch (error) {
      dispatch({type: types.SESSION_UPDATED})
    }
  }
)

export const loadCurrentUser = (opts = {})=> (
  async(dispatch, getState) => {
    try {
      const userData = await service.loadCurrentUser()
      dispatch({type: types.SESSION_UPDATED, user: userData})
      if (isFunction(opts.authChangeEvent)) service.registerAuthStateChangeEvent(opts.authChangeEvent)
    } catch (error) {
      console.error(error)
    }
  }
)

export const resetLoginErrors = ()=> ({
  type: types.LOGIN_ERRORS_UPDATED,
  error: null
})

export const resetSignupErrors = ()=> ({
  type: types.SIGNUP_ERRORS_UPDATED,
  error: null
})
