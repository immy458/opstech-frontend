import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { Link } from 'react-router-dom'

interface NavItem {
  text: string
  link: string
}

const Header: React.FC = () => {
  const [navOpenView, setNavOpenView] = useState(false)

  const handleNav = () => {
    setNavOpenView(!navOpenView)
  }

  const navItems: NavItem[] = [
    { text: 'Home', link: '/' },
    { text: 'About', link: 'about' },
    { text: 'Contact', link: '/contac' },
  ]

  return (
    <div className='bg-black flex justify-between items-center h-24  mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>OPSTECH.</h1>

      {/* Desktop Navigation Items */}
      <ul className='hidden md:flex'>
        {navItems.map((navItem, index) => (
          <Link to={navItem.link} key={index}>
            <li
              key={index}
              className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
            >
              {navItem.text}
            </li>
          </Link>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {navOpenView ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <ul
        className={
          navOpenView
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>OPSTECH.</h1>

        {/* Mobile Navigation Items */}
        {navItems.map((navItem, index) => (
          <Link to={navItem.link} key={index}>
            <li
              key={index}
              className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
            >
              {navItem.text}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Header
