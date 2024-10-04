import { Loader2 } from 'lucide-react'
import React from 'react'

export default function loading() {
  return (
    <div className='w-full min-h-screen flex justify-center items-center mx-auto font-bold animate-spin'>
      <Loader2 size={40}/>
    </div>
  )
}
