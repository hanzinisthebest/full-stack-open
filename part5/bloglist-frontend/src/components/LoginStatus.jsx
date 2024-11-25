import { useSelector } from 'react-redux'

const LoginStatus = ({ onLogout }) => {
  const user = useSelector(state => state.user)
//   const errorMessage = useSelector(state => state.notification.message) // If you're using Redux for error messages

  return (
    <div>
      {user === null ? (
        <p>log in to application</p>
      ) : (
        <div>
          <p>{user.name} is logged in</p>
          {/* Logout button moved to Navigation component */}
        </div>
      )}
      {/* {errorMessage !== null && <div className="error">{errorMessage}</div>} */}
    </div>
  )
}

export default LoginStatus 