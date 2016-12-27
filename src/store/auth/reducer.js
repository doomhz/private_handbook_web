import * as types from './action_types'
import Immutable from 'seamless-immutable'

const initialState = Immutable({})

const reduce = (state = initialState, action = {})=> {
  switch (action.type) {
    case types.SESSION_UPDATED:
      return state.merge({user: action.user})
    case types.LOGIN_ERRORS_UPDATED:
      return state.merge({login_errors: action.error})
    case types.SIGNUP_ERRORS_UPDATED:
      return state.merge({signup_errors: action.error})
    default:
      return state;
  }
}

export default reduce