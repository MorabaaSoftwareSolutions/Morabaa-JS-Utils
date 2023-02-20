import React from 'react'
import JsonParser from './JsonParser'
const JsonBuilder = ({ json, containerClass, onClick, setItem }) => (
  <div
    id={json.id}
    ref={(ref) => {
      if (!ref || ref.innerHTML) return
      const _setItem = (item) => {
        ref.innerHTML = ''
        ref.append(JsonParser(item, _setItem, containerClass, onClick))
      }
      _setItem(json)
    }}
  />
)

export default JsonBuilder
