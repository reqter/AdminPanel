import React, { useEffect, useState } from 'react'

let setNotif = (title, type) => [title, type]
const useNotification = () => {
  const [showNotif, setShowNotif] = useState(false)
  const [information, setInformation] = useState({
    title: '',
    type: 'alert'
  })

  useEffect(() => {
    if (showNotif) setTimeout(() => setShowNotif(false), 3000)
  })

  setNotif = (title, type = 'alert') => {
    setShowNotif(true)
    setInformation({
      title,
      type
    })
  }

  let notifInfo = {
    enable: showNotif,
    ...information
  }

  return [notifInfo, setNotif]
}

export default useNotification
