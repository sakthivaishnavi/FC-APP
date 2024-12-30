import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div>
        <div className='flex flex-col justify-center items-center gap-10'>
          <div className='text-white mt-64'>
        <h1 className='text-6xl text-center  font-bold font-serif'>Welcome to Kongu E-Food Court !</h1>
        <h2 className='text-2xl text-center mt-4 font-semibold font-serif'>Order your favourite food now...</h2>
        </div>
        <div>
          <Link to='/userLogin'>
        <button className='bg-white border-4 border-gray-400 hover:bg-gray-950 hover:border-white hover:text-white p-3 rounded-full font-bold text-2xl w-40 mt-5' type='submit'>Login</button>
        </Link></div>
        </div>
    </div>
  )
}

export default Welcome