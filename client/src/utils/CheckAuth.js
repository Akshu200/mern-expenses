import React from 'react';


import { Navigate } from 'react-router-dom';
import {useSelector} from 'react-redux'

export default function CheckAuth({ children }) {
    
    
    const auth= useSelector((state) =>state.auth)

    return auth.isAuthenticated ?children :<Navigate to='/login'/>;
}



