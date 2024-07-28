import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='p-3 px-5 flex justify-between shadow-md'>
             <Link to={'/dashboard'}>
            <img src='/logo.svg' className='cursor-pointer' width={100} height={100} />
            </Link>
          
                <div className='flex gap-2 items-center'>
                    <Link to={'/dashboard'}>
                        <Button variant="outline">Dashboard</Button>
                    </Link>
                    
                </div> 

        </div>
  )
}
