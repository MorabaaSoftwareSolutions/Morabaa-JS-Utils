import './json.css'
export { default as JsonParser } from './JsonParser'
export { default as JsonToView } from './JsonToView'
export const MockJsonSample = {
  name: 'John',
  age: 30,
  ownCars: true,
  obj: {
    car1: 'Ford',
    car2: 'BMW',
    car3: 'Fiat'
  },
  arr: ['Ford', 'BMW', 'Fiat'],
  arrObj: [
    {
      name: 'Ford',
      models: ['Fiesta', 'Focus', 'Mustang']
    },
    {
      name: 'BMW',
      models: ['320', 'X3', 'X5']
    }
  ]
}
