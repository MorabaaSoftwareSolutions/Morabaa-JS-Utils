import './json.css'
export { default as JsonBuilder } from './JsonBuilder'
export { default as JsonParser } from './JsonParser'
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
  ],
  fun: () => {
    return 'test'
  },
  fun2: (teset) => teset,
  fun3: (teset) => {
    return teset
  },
  fun4: ({ teset }) => {
    return teset
  },
  fun5: ({ teset }) => teset,
  fun6: ({ teset }) => {
    test = test + 1
    console.log(teset)
  }
}
