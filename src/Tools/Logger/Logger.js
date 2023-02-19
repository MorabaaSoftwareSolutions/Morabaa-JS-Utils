import { JsonParser } from '../Json'
import { Div, Span } from '../Tools'
let containerEl = false
const showOnLog = true
const popup = true

const Logger = ({
  json,
  clear = false,
  type = 'info',
  parent = document.body
}) => {
  if (!containerEl) createContainerEl(parent)
  if (clear) containerEl.clear()

  if (containerEl.getAttribute('is') === 'colabs') {
    containerEl.count++
    containerEl.setAttribute(
      'log-count',
      containerEl.count > 0 ? containerEl.count : 'hide'
    )
  } else {
    containerEl.count = 0
    containerEl.setAttribute('log-count', 'hide')
  }
  if (!json) json = `${json}`
  if (typeof json !== 'object')
    json = { [containerEl.childElementCount - 1]: json }
  console.log(json)
  let jsonEl = Div({ className: 'relative before' }, [JsonParser(json)])

  if (type) {
    jsonEl.firstChild.setAttribute('type', type)
    containerEl.show()
  } else if (showOnLog) containerEl.show()

  containerEl.add(jsonEl)
  containerEl.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  // if (timer) setTimeout(() => containerEl?.remove(), timer);
}

export default Logger

function createContainerEl(parent) {
  const logConainer = Div({ className: 'logger-child' })
  containerEl = Div(
    { id: 'logger-container', className: 'logger-container scroller' },
    [
      Span({
        className: 'clear-btn',
        innerText: 'clear',
        id: 'clear-btn',
        onclick: (e) => {
          e.stopPropagation()
          containerEl.setAttribute('is', 'colabs')
          setTimeout(() => {
            containerEl.clear()
          }, 200)
        }
      }),
      logConainer
    ]
  )

  containerEl.add = (jsonEl) => {
    jsonEl.setAttribute('area-label', `${logConainer.childElementCount}`)
    logConainer.prepend(jsonEl)
  }
  containerEl.count = 0
  containerEl.setAttribute('is', 'colabs')

  containerEl.clear = () => {
    console.clear()
    if (!containerEl) return
    containerEl.replaceChildren(
      Span({
        className: 'clear-btn',
        innerText: 'clear',
        id: 'clear-btn',
        onclick: (e) => {
          e.stopPropagation()
          containerEl.setAttribute('is', 'colabs')
          setTimeout(() => {
            containerEl.clear()
          }, 200)
        }
      })
    )

    containerEl.count = 0
  }

  let moved = [containerEl.offsetLeft, containerEl.offsetTop]
  let startX = 0,
    startY = 0
  const onMove = (x, y) => {
    x -= startX
    y -= startY
    containerEl.style.left = `${moved[0] + x}px`
    containerEl.style.top = `${moved[1] + y}px`
  }

  const animationDuration = 500
  containerEl.onmousedown = ({ target, clientX, clientY }) => {
    startX = clientX
    startY = clientY
    moved = [containerEl.offsetLeft, containerEl.offsetTop]
    containerEl.style.transitionDuration = '0s'
    const onMoveHandler = ({ clientX: x, clientY: y }) => {
      onMove(x, y)
    }
    const onUpHandler = () => {
      containerEl.style.transitionDuration = animationDuration + 'ms'
      window.removeEventListener('mousemove', onMoveHandler)
      window.removeEventListener('mouseup', onUpHandler)
      if (containerEl.childElementCount === 1) return
      if (
        moved[0] !== containerEl.offsetLeft ||
        moved[1] !== containerEl.offsetTop
      ) {
        moved = [containerEl.offsetLeft, containerEl.offsetTop]
        return
      }

      const overScreen =
        containerEl.offsetTop > window.innerHeight / 2 ||
        containerEl.offsetLeft > window.innerWidth / 2
      if (containerEl.offsetLeft < 0) containerEl.style.left = '10px'
      const isColabs = containerEl.getAttribute('is') === 'colabs'
      containerEl.setAttribute(
        'is',
        isColabs ? (overScreen ? 'default' : 'visible') : 'colabs'
      )

      if (isColabs) {
        containerEl.classList.remove('hide-child')
        containerEl.count = 0
        containerEl.setAttribute('log-count', 'hide')
      } else {
        setTimeout(() => {
          containerEl.classList.add('hide-child')
        }, animationDuration)
      }
    }
    window.addEventListener('mousemove', onMoveHandler)
    window.addEventListener('mouseup', onUpHandler)
  }
  containerEl.show = () => {
    const isColabs = containerEl.getAttribute('is') === 'colabs'
    if (!isColabs) return
    const overScreen =
      containerEl.offsetTop > window.innerHeight / 2 ||
      containerEl.offsetLeft > window.innerWidth / 2
    if (containerEl.offsetLeft < 0) containerEl.style.left = '10px'

    containerEl.setAttribute('is', overScreen ? 'default' : 'visible')
    setTimeout(() => {
      containerEl.classList.remove('hide-child')
    }, animationDuration)
  }

  parent.append(containerEl)
  setTimeout(() => (containerEl.style.opacity = '1'), 10)
}
