import React from 'react'

export const Content: React.FC = ({children}) => {
    return (
        <div className='content'>
            {children}
        </div>
    )
}