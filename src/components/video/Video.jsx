import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'
const Video = () => {
    const [value, setValue] = useState('video')
    useEffect(() => {
        return window.location.replace(`https://store.xecurify.com/moas/broker/login/jwt/22935?client_id=${value}&redirect_uri=http://127.0.0.1:5000/authenticated/${value}`)
    }, [])
    return (
        <div>
         
        </div>
      )
}
export default Video