import { useEffect } from 'react'
import { useNotifcationValue, useNotificationDispatch } from "../store/NotificationContext"
const Notification = () => {
  const notification = useNotifcationValue()
  const notificationDispatch = useNotificationDispatch()  // Get dispatch function
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  useEffect(() => {
    // If there's a notification, clear it after 5 seconds
    if (notification) {
      const timer = setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })  // Dispatch action to clear notification
      }, 5000)

      // Cleanup the timer if the component unmounts or notification changes
      return () => clearTimeout(timer)
    }
  }, [notification, notificationDispatch])

  if (notification === null) {
    return null
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
