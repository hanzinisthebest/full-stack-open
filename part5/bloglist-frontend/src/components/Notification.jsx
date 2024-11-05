import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { setNotificationWithTimeout} from "../reducers/notificationReducer"
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
      dispatch(setNotificationWithTimeout(notification, 5))
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