import './spliter.css'
import React from 'react'
import { Spliter } from '../Lib'
const AnyComponent = ({ children, className, i }) => {
  return (
    <div className={`spliter-child  ${className}`} style={{ display: 'flex' }}>
      <h1>Spliter {i}</h1>
      <p
        className='button m-auto'
        onClick={() => {
          localStorage.removeItem(`spliter-storage-key-${i}`)
          window.location.reload()
        }}
      >
        Reset Spliter
      </p>
      {children}
    </div>
  )
}

const SpliterExample = () => {
  const [, render] = React.useState(0)
  return (
    <div className='spliter-main'>
      <div>
        <AnyComponent className='bg-flamingo col' i={1} />
        <Spliter vertical storageKey='spliter-storage-key-1' />
        <div>
          <AnyComponent className='bg-green' i={2} />
          <Spliter storageKey='spliter-storage-key-2' />
          <AnyComponent className='bg-cyan' i={2} />
        </div>
      </div>

      <Spliter
        storageKey='spliter-storage-key-3'
        className='p-sm bg-green mx-sm opacity-70'
        initialRatios={[0.3, 0.7]}
      />

      <div className='bg-throne spliter-child'>
        <AnyComponent className='bg-green' i={4} />
        <Spliter
          vertical
          storageKey='spliter-storage-key-4'
          className='bg-green my-sm opacity-70'
        />
        <div>
          <AnyComponent className='bg-cyan' i={5} />
          <Spliter storageKey='spliter-storage-key-5' />
          <div>
            <AnyComponent className='bg-green' i={6} />
            <Spliter storageKey='spliter-storage-key-6' />
            <AnyComponent className='bg-cyan' i={6} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpliterExample
