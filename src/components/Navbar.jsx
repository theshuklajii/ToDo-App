import React from 'react'
import "./Navbar.css"

const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="logo">
            <span><h3 className='to'>TO</h3></span> <span><h3 className='do'>DO</h3></span>
        </div>
        <ul>
            <a href="#"><li>Home</li></a>
            <a href="#"><li>Your ToDo's</li></a>
        </ul>
      </nav>
      
    </div>
  )
}

export default Navbar
