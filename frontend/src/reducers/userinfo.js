import * as actionTypes from '../constants/userinfo'

const initialState = {}

export default function userinfo(state = initialState, action) {
    switch (action.type) {
        // login
        case actionTypes.USERINFO_LOGIN:
            return action.data

        default:
            return state
    }
}