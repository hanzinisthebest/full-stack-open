import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { clearNotification} from "../reducers/notificationReducer"
const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  useEffect(() => {
    if (notification !== '') {
      const timer = setTimeout(() => {
        dispatch(clearNotification());  // Dispatch the action to clear the notification
      }, 5000);
      return () => clearTimeout(timer);  // Clean up the timeout if the component is unmounted or re-rendered
    }
  }, [notification, dispatch]);


  if (notification === '') {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification