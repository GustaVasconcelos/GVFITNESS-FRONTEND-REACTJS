import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Usuarios from './Users/index'

import PrivateRoute from '../../services/wAuth'
import Cadastro from './Register/index'
const ContentAdmin = props => (
    <main className="Content">
        <Routes>
            <Route exact path="/Usuarios" element={<PrivateRoute redirectTo='/'><Usuarios/></PrivateRoute>}></Route>
            <Route exact path="/Cadastro" element={<PrivateRoute redirectTo='/'><Cadastro/></PrivateRoute>}></Route>
            <Route path="*" element={<Usuarios/>}></Route>
        </Routes>
    </main>
)

export default ContentAdmin