import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const NotificationBar = ({ title, enable, type }) => {
  const [transition] = useState()
  const [backgroundColor, setBackground] = useState('#ffab23')

  useEffect(
    () => {
      if (enable) {
        switch (type) {
          case 'alert':
            setBackground('#ff0250')
            break
          case 'warning':
            setBackground('#ffab23')
            break
          case 'info':
            setBackground('#0054fe')
            break
          default:
        }
      } else {
      }
    },
    [enable]
  )

  return (
    <div
      style={{
        backgroundColor,
        width: 200,
        height: 100,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10000
      }}
    >
      test notif
    </div>
  )
}

NotificationBar.propTypes = {
  title: PropTypes.string,
  type: PropTypes.oneOf(['alert', 'success', 'info']),
  enable: PropTypes.bool
}
NotificationBar.defaultProps = {
  type: 'alert',
  enable: false
}

export default NotificationBar
