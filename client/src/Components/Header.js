import React from 'react'
import logo from "./assets/logo.png"

export default function Header() {
  return (
    <nav className='navbar bg-light mb-4 p-0'>Header
        <div className='container'>
            <a className='navbar-brand'href='/'></a>
            <div className='d-flex'>
                <img src={logo} className="mr-2"/>
                <div>MERN-GraphQL</div>
            </div>
        </div>
    </nav>
  )
}
