import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';


  



export const ProtectedRoutes  = ({children}:any) => {


    const Token=Cookies.get('token')
   
   

    
   
    return (Token !== undefined) ? children : <Navigate to="/login"/>
}