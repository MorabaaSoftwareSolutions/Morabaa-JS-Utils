import React from 'react'
import { JsonBuilder, JsonParser, MockJsonSample } from '../Lib'
import './json.css'

const JsonExample = () => {
  setTimeout(() => {
    const jsonExampleConatiner = document.getElementById('json-example')
    const jsonParser = jsonExampleConatiner.querySelector('#json-parser')
    if (!jsonParser) {
      jsonExampleConatiner.append(
        JsonParser({ ...MockJsonSample, JsonType: 'JsonParser' })
      )
    }
  }, 100)
  return (
    <div
      id='json-example'
      className='col gap-lg p-lg h-screen overflow-auto scroller'
    >
      <h1>JsonExample</h1>
      <JsonBuilder json={{ ...MockJsonSample, type: 'JsonBuilder' }} />
    </div>
  )
}

export default JsonExample

const sample = {
  id: '943-34234kf-f32f-23f32f-c8',
  name: 'Jhon Doe',
  descriptionT:
    'somthing going on here ok then this is a description so that is not a good idea',
  amBoolean: true,
  objectColction: [
    { id: 'KKKK' },
    { name: 'Obdestest' },
    { description: 'obdes' }
  ],
  colction: ['one ', 'test', 'four', 'four', 'four', 'owls'],
  object: {
    id: 'K-sdf-KK-sdfK',
    name: 'Jhon Doe',
    description: 'this is a description',
    idK: 'K-sdf-KK-sdfK',
    nameK: 'Obdes test by Jhon Doe'
  }
}
