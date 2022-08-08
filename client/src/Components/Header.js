import React from 'react'
import logo from "./assets/logo.png"

export default function Header() {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
        <div className='container'>
            <a className='navbar-brand'href='/'>Home</a>
            <div className='d-flex '>
                <img src={logo} className="m-3 logo w-80" alt='logo'/>
                <div className='mt-2 p-0 '>MERN-GraphQL</div>
            </div>
        </div>
    </nav>
  )
}
