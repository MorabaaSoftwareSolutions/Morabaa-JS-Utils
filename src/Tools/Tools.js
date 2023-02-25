export const CreateTag = (tag, props, children) => {
  const element = document.createElement(tag)
  Object.entries(props).forEach(([key, value]) => (element[key] = value))
  children && element.append(...children)
  return element
}

export const Div = (props, children) => CreateTag('div', props, children)
export const P = (props, children) => CreateTag('p', props, children)
export const Span = (props) => CreateTag('span', props)
export const Input = (props) => CreateTag('input', props)
export const Img = (props, children) => CreateTag('img', props, children)
export const Button = (props) => CreateTag('button', props)
export const Fragment = (children = []) => CreateTag('fragment', {}, children)
export const LinkButton = (props) => CreateTag('a', props)
export const Br = () => document.createElement('br')

export function Select({ className, value, options, onChange }) {
  const selectNode = document.createElement('select')
  options.forEach((item) => {
    const optionNode = document.createElement('option')
    optionNode.value = item.id
    optionNode.innerText = item.title
    selectNode.append(optionNode)
  })
  selectNode.className = className
  selectNode.onchange = onChange
  selectNode.value = value
  return selectNode
}

export function Video(props, children) {
  props.id = 'video'
  return CreateTag('video', props, children)
}

export const isMobile =
  navigator.userAgent.toLowerCase().match(/mobile/i) != null

export const ReactToNode = ({ reactComponent, props = {} }) => {
  const fn = reactComponent?.type ?? reactComponent
  if (typeof fn === 'function') return create(fn(props))
}

const create = (reactComponent) => {
  if (!reactComponent) return document.createTextNode('')
  if (typeof reactComponent === 'string')
    return document.createTextNode(reactComponent)

  let element
  if (reactComponent.type === 'svg') return createSvg(reactComponent)
  else if (typeof reactComponent.type === 'function')
    element = create(reactComponent.type(reactComponent.props))
  else element = document.createElement(reactComponent.type)

  Object.entries(reactComponent.props).map(([key, value]) => {
    if (key === 'children') return
    else if (key === 'style')
      return Object.entries(value).map(
        ([styleKey, styleValue]) => (element.style[styleKey] = styleValue)
      )
    else if (key !== 'className') key = key.toLocaleLowerCase()
    element[key] = value
  })
  if (typeof reactComponent.props.children === 'object') {
    Array.isArray(reactComponent.props.children)
      ? Object.values(reactComponent.props.children).forEach((nestedChild) =>
          element.append(create(nestedChild))
        )
      : element.append(create(reactComponent.props.children))
  } else element.append(reactComponent.props.children ?? '')
  return element
}

const createSvg = (svg) => {
  let element = document.createElementNS('http://www.w3.org/2000/svg', svg.type)
  const children = svg.props.children
  Object.entries(svg.props).map(([key, value]) => {
    if (key === 'children') return
    else if (key === 'style')
      return Object.entries(value).map(
        ([styleKey, styleValue]) => (element.style[styleKey] = styleValue)
      )
    else if (NS_KEYS[key]) {
      element.setAttribute(NS_KEYS[key], value)
    } else element.setAttribute(camelToDashCase(key).toLowerCase(), value)
  })
  if (typeof children === 'object') {
    Array.isArray(children)
      ? Object.values(children).forEach((nestedChild) =>
          element.append(createSvg(nestedChild))
        )
      : element.append(createSvg(children))
  } else element.append(children ?? '')
  return element
}

const NS_KEYS = {
  className: 'class',
  viewBox: 'viewBox'
}
const camelToDashCase = (str) =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

// const dashToCamelCase = (str) =>
//   str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())

// const preformance = (fn, ...args) => {
//   const start = performance.now()
//   const result = fn(...args)
//   const end = performance.now()
//   console.log(`Time: ${end - start}ms`)
//   Logger.info(result)
//   return result
// }
