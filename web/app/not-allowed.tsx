import React from 'react'

export default function NotAllowedAlert() {

  return (
    <div className='w-full h-[calc(100vh-3.5rem)] flex'>
      <div className="m-auto">
        You do not have the role to access this page.
      </div>
    </div>
  )
}
