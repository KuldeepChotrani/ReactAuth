import React,{ useState, useEffect } from 'react'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom'
const ApplicationToRedirect = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let appName = params.get('app');
    useEffect(() => {
      return window.location.replace(`https://store.xecurify.com/moas/broker/login/jwt/22935?client_id=${appName}&redirect_uri=http://127.0.0.1:5000/authenticated/${appName}`)
 
    }, [])
    return (
        <div>
         
        </div>
      )
}
export default ApplicationToRedirect