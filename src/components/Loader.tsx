import React from 'react'

export const Loader: React.FC = () => {
  return (
    <div className='loader-container'>
      <div className='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
