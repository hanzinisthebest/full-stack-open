import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { login } from "../reducers/userReducer"
import { setNotificationWithTimeout } from "../reducers/notificationReducer"
import { useField } from '../hooks'
const LoginForm = () => {
    const dispatch = useDispatch()
    const username = useField('text')
    const password = useField('password')
    const user  = useSelector(state => state.user)
    const handleLogin = async () => {
      try {
        await dispatch(login({username: username.inputProps.value, password: password.inputProps.value}))
        dispatch(setNotificationWithTimeout(`welcome ${username.inputProps.value}`, 'success', 5))
      } catch (exception) {
        // console.log(exception);
        
        dispatch(setNotificationWithTimeout('wrong credentials', 'error', 5))
      }
    }
    const handleSubmit =  (event) => {
      event.preventDefault()

      handleLogin()

      if (user) {
        username.reset()
        password.reset()
      }
    }
   return (
     <div>
       <form onSubmit={handleSubmit}>
         <div>
           username
           <input
           {...username.inputProps}
           data-testid='username'
           />
         </div>
         <div>
           password
           <input
           {...password.inputProps}
           data-testid='password'
           />
       </div>
         <button type="submit">login</button>
       </form>
     </div>
   )
 }
 
 export default LoginForm