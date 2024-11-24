import {configureStore} from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import users from './services/users'

const store = configureStore({
    reducer: {
      notification : notificationReducer,
      blogs: blogsReducer,
      user: userReducer,
      users: usersReducer
    }
  })

export default store