import Togglable from './Togglable'
import LoginForm from './LoginForm'

const LoginFormWrapper = () => {
  return (
    <Togglable buttonLabel='log in'>
      <LoginForm />
    </Togglable>
  )
}

export default LoginFormWrapper 