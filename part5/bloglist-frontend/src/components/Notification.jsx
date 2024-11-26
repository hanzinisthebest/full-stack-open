import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { setNotificationWithTimeout} from "../reducers/notificationReducer"
import './Notification.css'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (notification.message !== '' && notification.type !== '') {
  //     dispatch(setNotificationWithTimeout(notification.message,notification.type, 5))
  //   }
  // }, [notification, dispatch]);

  if (notification.message === '') {
    return null
  }

// Assuming notification is an object with message and type
  // e.g., { message: "Login failed", type: "error" }
  // const notificationType = notification.type || 'success'

  return (
    <div className="notification-container">
      <div className={`notification-content ${notification.type}`}>
        <span>{notification.message}</span>
      </div>
    </div>
  )
}

export default Notification