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
            jsonLog: 'MockJsonSample' + init,
            parent: document.getElementById('logger-example')
          })
          return
          if (init) return
          Logger({
            jsonLog: MockJsonSample,
            parent: document.getElementById('logger-example')
          })
          Logger({
            jsonLog: MockJsonSample,
            parent: document.getElementById('logger-example'),
            type: 'error'
          })
          Logger({
            jsonLog: MockJsonSample,
            parent: document.getElementById('logger-example'),
            type: 'warn'
          })
          Logger({
            jsonLog: MockJsonSample,
            parent: document.getElementById('logger-example'),
            type: 'success'
          })
          Logger({
            jsonLog: 0,
            parent: document.getElementById('logger-example')
          })
          Logger({
            jsonLog: 'MockJsonSample',
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
