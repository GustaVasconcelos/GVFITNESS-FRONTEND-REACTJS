
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Contatos from '../components/Contatos/index'

import InicioLogin from '../components/Inicio/index'

const Content = props => (
    <main className="Content">
        <Routes>
            <Route exact path="/" element={<InicioLogin/>}></Route>
            <Route exact path="/Contatos" element={<Contatos/>}></Route>
        </Routes>
    </main>
)

export default Content