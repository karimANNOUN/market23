
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import { Login } from '../login/Login'
import { Register } from '../login/Register'
import { Home } from '../pages/home/Home'
import { Profil } from '../pages/profil/Profil'
import { Store } from '../pages/storemarket/Store'
import { NewProduct } from '../pages/addNewProduct/NewProduct'
import { ProtectedRoutes } from './ProtectedRoutes'
import { PersonalProduct } from '../pages/product/PersonalProduct'
import { Dashboard } from '../pages/dashboard/Dashboard'


export const AllRoutes = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<ProtectedRoutes><Home/></ProtectedRoutes>} />
        <Route path='/profil' element={<ProtectedRoutes><Profil/></ProtectedRoutes>} />
        <Route path='/newproduct' element={<ProtectedRoutes><NewProduct/></ProtectedRoutes>} />
        <Route path='/store' element={<ProtectedRoutes><Store/></ProtectedRoutes>} />
        <Route path='/dashboard' element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>} />
        <Route path='/product/:id' element={<ProtectedRoutes><PersonalProduct/></ProtectedRoutes>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />

    </Routes>
        
    </>
  )
}
