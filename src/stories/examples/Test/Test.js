import './test.css'
import React from 'react'
import { JsonBuilder } from '../Lib'
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

const Test = () => {
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

  return <div>test</div>
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

export default Test
