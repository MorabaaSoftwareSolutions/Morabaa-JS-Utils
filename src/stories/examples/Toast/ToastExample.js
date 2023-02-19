import './toast.css'
import React from 'react'
import { Toast, testToast, ToastActions } from '../Lib'

const ToastExample = () => {
  // testToast()
  const toastSample = () => {
    Toast.success({
      title: 'تم',
      content: 'تم الارسال بنجاح'
    })
  }
  return (
    <div className='toast-main col-center gap-2xl'>
      <h1>Toast</h1>
      <p className='button' onClick={toastSample}>
        ارسال
      </p>

      <div className='row-center gap-md'>
        {ToastActions.map(({ action, title, content }, index) => (
          <p
            className='button'
            key={index}
            onClick={() => {
              Toast[action]({ title, content, timeout: 3_000 })
            }}
          >
            {action}
          </p>
        ))}
      </div>
    </div>
  )
}

export default ToastExample
