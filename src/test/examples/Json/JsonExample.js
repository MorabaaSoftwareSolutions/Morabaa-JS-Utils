import React from 'react'
import { JsonBuilder, JsonParser, MockJsonSample, Utils } from '../Lib'
import './json.css'

const JsonExample = () => {
  setTimeout(() => {
    const jsonExampleConatiner = document.getElementById('json-example')
    const jsonParser = jsonExampleConatiner.querySelector('#json-parser')

    if (!jsonParser) {
      jsonExampleConatiner.append(
        JsonParser({
          json: {
            date: Utils.formatedRelativeDate(
              new Date('2021-01-01'),
              new Date('2021-01-02')
            ),
            JsonType: 'JsonParser'
          }
        })
      )
    }
  }, 100)
  return (
    <div
      id='json-example'
      className='col gap-lg p-lg h-screen overflow-auto scroller'
    >
      <h1>JsonExample</h1>

      <JsonBuilder
        json={{
          seconds: Utils.formatedRelativeDate(
            new Date('2021-01-01 00:00:01'),
            new Date('2021-01-01 00:00:04')
          ),
          minutes: Utils.formatedRelativeDate(
            new Date('2021-01-01 00:01:00'),
            new Date('2021-01-01 00:04:00')
          ),
          hours: Utils.formatedRelativeDate(
            new Date('2021-01-01 01:00:00'),
            new Date('2021-01-01 04:00:00')
          ),
          days: Utils.formatedRelativeDate(
            new Date('2021-01-01 00:00:00'),
            new Date('2021-01-04 00:00:00')
          ),
          months: Utils.formatedRelativeDate(
            new Date('2021-01-01 00:00:00'),
            new Date('2021-04-01 00:00:00')
          ),
          years: Utils.formatedRelativeDate(
            new Date('2021-01-01 00:00:00'),
            new Date('2024-01-01 00:00:00')
          ),
          type: 'JsonBuilder'
        }}
      />
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
