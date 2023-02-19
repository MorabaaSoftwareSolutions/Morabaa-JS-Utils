import './logger.css'
import React from 'react'
import { Logger, MockJsonSample } from '../Lib'
import '../../../Tools/Json/json.css'
const LoggerExample = () => {
  return (
    <div id='logger-example' className='logger-example'>
      <h1 className='text-center text-xl'>Logger</h1>
      <p
        className='button'
        onClick={() => {
          Logger({
            json: MockJsonSample,
            parent: document.getElementById('logger-example'),
            type: 'info'
          })
          Logger({
            json: MockJsonSample,
            parent: document.getElementById('logger-example'),
            type: 'error'
          })
          Logger({
            json: MockJsonSample,
            parent: document.getElementById('logger-example'),
            type: 'warn'
          })
          Logger({
            json: MockJsonSample,
            parent: document.getElementById('logger-example'),
            type: 'success'
          })
        }}
      >
        log
      </p>
    </div>
  )
}

export default LoggerExample
