import './logger.css'
import React from 'react'
import { Logger, MockJsonSample } from '../Lib'
import '../../../Tools/Json/json.css'
let init = -1
const LoggerExample = () => {
  return (
    <div id='logger-example' className='logger-example col'>
      <h1 className='text-center text-xl'>Logger</h1>
      <p
        className='button m-auto'
        onClick={() => {
          init++
          Logger({
            json: 'MockJsonSample' + init,
            parent: document.getElementById('logger-example')
          })
          if (init) return
          Logger({
            json: MockJsonSample,
            parent: document.getElementById('logger-example')
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
          Logger({
            json: 0,
            parent: document.getElementById('logger-example')
          })
          Logger({
            json: 'MockJsonSample',
            parent: document.getElementById('logger-example')
          })
        }}
      >
        log
      </p>
    </div>
  )
}

export default LoggerExample
