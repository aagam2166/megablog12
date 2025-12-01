import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        if (authentication && !authStatus) {
            // Protected route but user is NOT logged in
            navigate("/login")
        } 
        else if (!authentication && authStatus) {
            // Public-only route but user IS logged in
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}
