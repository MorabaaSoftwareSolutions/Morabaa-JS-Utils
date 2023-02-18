import './spliter.css'
import React from 'react'
import { Spliter } from '../Lib'
import Test from '../Test/Test'
// import MockApiService from '../../../mock/MockApiService'

const ItemCard = ({ item }) => {
  return (
    <div className='card'>
      <p>{item.name}</p>
      <p>{item.description}</p>
      <p>{item.wholeSalePrice}</p>
      <p>{item.morabaaId}</p>
      <p>{item.test}</p>
    </div>
  )
}

const SpliterExample = () => {
  // const service = React.useMemo(() => {
  //   const mockApi = new MockApiService({ baseURL: 'baseURL_test' })
  //   const _service = new PagenationService({
  //     callback: mockApi.get,
  //     endpoint: 'mock',
  //     useCash: true,
  //     storage: sessionStorage
  //     // storageKey: 'test-recycler'
  //   })
  //   _service.search()
  //   return _service
  // }, [])

  return (
    <div className='spliter-main'>
      <div className='bg-throne spliter-child'>
        <h1>Spliter</h1>
        <Test />
      </div>
      <Spliter storageKey='spliter-story-example' />
      <div className='bg-prim spliter-child'>
        <h1>Spliter Two</h1>
        <Test />
      </div>
    </div>
  )
  // return (
  //   <RecyclerList service={service} itemBuilder={ItemCard}>
  //     <input
  //       type='text'
  //       onChange={({ target }) => {
  //         service.updateQueryParams({ id: 'name', value: target.value })
  //       }}
  //     />
  //   </RecyclerList>
  // )
}

export default SpliterExample
