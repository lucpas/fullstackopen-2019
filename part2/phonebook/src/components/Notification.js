import React from 'react'

import './Notification.css'

const Notification = (props) => {
    return (
        <div className={props.type}>
            {props.msg}
        </div>
    )
}

export default Notification
