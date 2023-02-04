import React from 'react'
import { Routes, Route } from 'react-router-dom'


import PrivateRoute from '../../services/wAuth'

import Exercise from './Exercises'
import Data from './Data'
const ContentAdmin = props => (
    <main className="Content">
        <Routes>
            <Route exact path="/Exercicios" element={<PrivateRoute redirectTo='/'><Exercise/></PrivateRoute>}></Route>
            <Route exact path="/Dados" element={<PrivateRoute redirectTo='/'><Data/></PrivateRoute>}></Route>
            <Route path="*" element={<Exercise/>}></Route>
        </Routes>
    </main>
)

export default ContentAdmin