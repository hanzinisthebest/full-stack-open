import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        }


    }

})

export const { setUser } = userSlice.actions

export const login = (userData) => {
    return async dispatch => {
        const user = await loginService.login(userData)
        window.localStorage.setItem(
            'loggedNoteappUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        dispatch(setUser(user))
    }
}

export const logout = () => {
    return async (dispatch) => {
      console.log("logout");
      
      window.localStorage.removeItem('loggedNoteappUser') // Clear localStorage
      dispatch(setUser(null)) // Reset user in Redux state
    }
  }

export default userSlice.reducer