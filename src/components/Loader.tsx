import React from 'react'

export default function Loader() {
  return (
    <div className='w-full md:max-w-96 lg:max-w-96'>
      <div className="container bg-gray-200 dark:bg-gray-800  mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto border border-gray-300 rounded-md px-5 py-6 ">
          <div>
            <h1 className="w-3/4"></h1>
            <p className="mb-2 bg-neutral-500 animate-pulse"></p>
          </div>
          <p className="mb-4 w-full h-5 animate-pulse"></p>
          <div className='h-5 w-full bg-neutral-500 animate-pulse'></div>
          <div className="mt-4 animate-pulse bg-neutral-400 h-3 space-x-2 flex text-sm font-semibold">
          </div>
        </div>
      </div>
    </div>
  )
}
