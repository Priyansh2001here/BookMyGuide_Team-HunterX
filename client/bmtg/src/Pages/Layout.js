import React from 'react'
import BottomNav from '../Components/BottomNav/BottomNav'

function Layout({children}) {
    return (
        <>
           {children}
           <BottomNav/> 
        </>
    )
}

export default Layout
