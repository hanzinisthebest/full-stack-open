import { createContext,useReducer, useContext } from "react";

const notificationReducer = (state, action) => {

    switch (action.type) {
        case 'ADD_NOTIFICATION':
            return action.payload

        case 'VOTED_NOTIFICATION':
            return action.payload

        case 'CLEAR_NOTIFICATION':
            return null

        case 'ERROR_NOTIFICATION':
            return action.payload
        
        default:
            return state
}
}

export const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {

    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={{ notification, notificationDispatch }}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotifcationValue = () => {
    const { notification } = useContext(NotificationContext);  // Destructure correctly
    return notification;
}

export const useNotificationDispatch = () => {
    const { notificationDispatch } = useContext(NotificationContext);  // Destructure correctly
    return notificationDispatch;
}