import { JsonParser } from '../Json'
import { Div, Span } from '../Tools'
let containerEl = false
const showOnLog = false
const popup = true
const animationDuration = 250
let observer

const Logger = ({ json, clear = false, type = '', parent = document.body }) => {
  if (!containerEl) createContainerEl(parent)
  if (clear) containerEl.clear()

  if (containerEl.getAttribute('is') === 'colabsed') {
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
  if (typeof json !== 'object') json = { '.': json }
  console.log(json)
  let jsonEl = Div({ className: 'log-container' }, [JsonParser(json)])
  observer.observe(jsonEl, { childList: true, subtree: true })

  if (type) {
    jsonEl.firstChild.setAttribute('type', type)
    if (type === 'error') containerEl.show()
  } else if (showOnLog) containerEl.show()

  containerEl.add(jsonEl)
  containerEl.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  // if (timer) setTimeout(() => containerEl?.remove(), timer);
}

export default Logger

function createContainerEl(parent) {
  const logConainer = Div({ className: 'logger-child scroller' })
  containerEl = Div(
    { id: 'logger-container', className: 'logger-container hide-child' },
    [
      Span({
        className: 'clear-btn',
        innerText: 'clear',
        id: 'clear-btn',
        onclick: (e) => {
          e.stopPropagation()
          containerEl.setAttribute('is', 'colabsed')
          setTimeout(() => {
            containerEl.clear()
          }, animationDuration)
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
  containerEl.setAttribute('is', 'colabsed')

  containerEl.clear = () => {
    console.clear()
    if (!containerEl) return
    logConainer.innerHTML = ''
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

  containerEl.onmousedown = ({ target, clientX, clientY }) => {
    containerEl.style.transitionDuration = '0s'
    startX = clientX
    startY = clientY
    const checkOffset = 20
    const isRight =
      containerEl.offsetLeft + containerEl.offsetWidth - checkOffset < clientX
    const isBottom =
      containerEl.offsetTop + containerEl.offsetHeight - checkOffset < clientY
    if (isRight && isBottom) return
    moved = [containerEl.offsetLeft, containerEl.offsetTop]
    const onMoveHandler = ({ clientX: x, clientY: y }) => {
      onMove(x, y)
    }
    const onUpHandler = () => {
      containerEl.style.transitionDuration = animationDuration + 'ms'
      window.removeEventListener('mousemove', onMoveHandler)
      window.removeEventListener('mouseup', onUpHandler)
      if (logConainer.childElementCount === 0) return
      if (
        Math.abs(moved[0] - containerEl.offsetLeft) > 10 ||
        Math.abs(moved[1] - containerEl.offsetTop) > 10
      ) {
        moved = [containerEl.offsetLeft, containerEl.offsetTop]
        containerEl.corectPosition()
        return
      }
      containerEl.toogle()
    }
    window.addEventListener('mousemove', onMoveHandler)
    window.addEventListener('mouseup', onUpHandler)
  }
  containerEl.toogle = () => {
    const isColabs = containerEl.getAttribute('is') === 'colabsed'
    if (isColabs) {
      containerEl.show()
    } else {
      containerEl.colabs()
    }
  }
  containerEl.colabs = () => {
    containerEl.setAttribute('is', 'colabsed')
    setTimeout(() => {
      containerEl.corectPosition()
      containerEl.classList.add('hide-child')
    }, animationDuration)
  }
  containerEl.show = () => {
    const isColabs = containerEl.getAttribute('is') === 'colabsed'
    if (!isColabs) return
    const overScreen =
      containerEl.offsetTop > window.innerHeight / 2 ||
      containerEl.offsetLeft > window.innerWidth / 2

    containerEl.setAttribute('is', overScreen ? 'default' : 'visible')
    containerEl.classList.remove('hide-child')
    containerEl.corectPosition()
  }
  containerEl.corectPosition = () => {
    const margin = 20
    if (containerEl.offsetLeft < 0) containerEl.style.left = '10px'
    else if (
      containerEl.offsetLeft >
      window.innerWidth - containerEl.offsetWidth
    )
      containerEl.style.left =
        window.innerWidth - containerEl.offsetWidth - margin + 'px'

    if (containerEl.offsetTop < 0) containerEl.style.top = '3%'
    else if (
      containerEl.offsetTop >
      window.innerHeight - containerEl.offsetHeight
    )
      containerEl.style.top =
        window.innerHeight - containerEl.offsetHeight - margin + 'px'
  }

  parent.append(containerEl)
  setTimeout(() => (containerEl.style.opacity = '1'), 10)
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('hidden')
        } else {
          entry.target.classList.add('hidden')
        }
      })
    },
    { threshold: 0, root: logConainer }
  )
}
