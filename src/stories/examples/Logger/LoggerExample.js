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
          Logger.expand()
          init++
          Logger({
            log: 'MockJsonSample' + init,
            parent: document.getElementById('logger-example')
          })
          if (init) return
          Logger({
            log: MockJsonSample,
            parent: document.getElementById('logger-example'),
            silent: false
          })
          Logger({
            log: MockJsonSample,
            parent: document.getElementById('logger-example'),
            type: 'error'
          })
          Logger({
            log: MockJsonSample,
            parent: document.getElementById('logger-example'),
            type: 'warn'
          })
          Logger({
            log: MockJsonSample,
            parent: document.getElementById('logger-example'),
            type: 'success'
          })
          Logger({
            log: MockJsonSample,
            parent: document.getElementById('logger-example'),
            type: 'debug'
          })
          Logger({
            log: MockJsonSample,
            parent: document.getElementById('logger-example'),
            type: 'info'
          })
          Logger({
            log: 0,
            parent: document.getElementById('logger-example')
          })
          Logger({
            log: 'MockJsonSample',
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
