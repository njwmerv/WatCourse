import React from 'react'

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md fixed w-full top-0 left-0">
      <p className="text-2xl font-bold">Logo</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Log In
      </button>
    </div>
  )
}
