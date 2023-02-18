import './toast.css'
import React from 'react'
import Toast, { testToast } from '../../../Tools/Toast'

const ToastExample = () => {
  // testToast()
  // Toast.error({
  //   title: 'حصل خظاء',
  //   content: 'الرجاء التاكد من الاتصال بالانترنت'
  // })
  // Toast.success({
  //   title: 'تم بنجاح',
  //   content: 'تم اضافة المنتج الى السلة'
  // })

  //
  Toast.success({
    title: 'تم بنجاح',
    content: 'تم اضافة المنتج الى السلة',
    timeout: 3_000
  })

  //

  return (
    <div className='toast-main col-center gap-2xl'>
      <div className='bg-throne'>
        <h1>Toast</h1>
      </div>
      <p
        className='button'
        onClick={() => {
          // Toast.success({
          //   title: 'تم بنجاح',
          //   content: 'تم الارسال الى  حيدر'
          // })
          Toast.error({
            title: 'حصل خظاء',
            content: 'الرجاء المحاولة مرة اخرى'
          })
        }}
      >
        {'ارسال الى حيدر'}
      </p>
    </div>
  )
}

export default ToastExample
