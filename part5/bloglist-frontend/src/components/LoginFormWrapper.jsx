import './LoginFormWrapper.css'
import LoginForm from './LoginForm'
import Notification from './Notification'

const LoginFormWrapper = () => {
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <Notification />
        <h1>Welcome Back</h1>
        <p className="login-subtitle">Please login to continue</p>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginFormWrapper