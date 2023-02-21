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
            msg: 'MockJsonSample' + init,
            parent: document.getElementById('logger-example')
          })
          if (init) return
          Logger({
            msg: MockJsonSample,
            parent: document.getElementById('logger-example')
          })
          Logger({
            msg: MockJsonSample,
            parent: document.getElementById('logger-example'),
            type: 'error'
          })
          Logger({
            msg: MockJsonSample,
            parent: document.getElementById('logger-example'),
            type: 'warn'
          })
          Logger({
            msg: MockJsonSample,
            parent: document.getElementById('logger-example'),
            type: 'success'
          })
          Logger({
            msg: MockJsonSample,
            parent: document.getElementById('logger-example'),
            type: 'debug'
          })
          Logger({
            msg: MockJsonSample,
            parent: document.getElementById('logger-example'),
            type: 'info'
          })
          Logger({
            msg: 0,
            parent: document.getElementById('logger-example')
          })
          Logger({
            msg: 'MockJsonSample',
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
