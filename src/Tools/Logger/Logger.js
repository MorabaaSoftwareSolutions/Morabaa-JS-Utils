import { Utils } from '../../utils'
import { JsonParser } from '../Json'
import { Div, Span } from '../Tools'
let containerEl
const showOnLog = false
const popup = true
const animationDuration = 250
let observer = {
  observe: () => {}
}
const isMobile = navigator.userAgent.toLowerCase().match(/mobile/i) != null
// document.body.append(
//   Span({
//     className:
//       'fixed top-0  right-0 z-50 p-2 m-2  bg-prim text-white rounded-lg',
//     innerText: `isMobile: ${isMobile}`
//   })
// )

const Logger = async ({
  msg,
  clear = false,
  type = 'default',
  parentId = 'root'
}) => {
  if (!containerEl) {
    await Utils.sleep(100)
    createContainerEl(parentId)
  }
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
  if (!msg) msg = `${msg}`
  if (typeof msg !== 'object') msg = { '.': msg }
  console.log(msg)
  let jsonEl = Div({ className: 'log-container' }, [JsonParser(msg)])
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

function createContainerEl(parentId) {
  if (containerEl) return
  const logConainer = Div({ className: 'logger-child scroller' })
  containerEl = Div(
    { id: 'logger-container', className: 'logger-container hide-child' },
    [
      Span({
        className: 'logger-clear-btn',
        innerText: 'clear',
        id: 'logger-clear-btn',
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

  checkImage()

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
    containerEl.setAttribute('log-count', 'hide')
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

  if (isMobile)
    containerEl.ontouchstart = ({ target, touches }) => {
      containerEl.style.transitionDuration = '0s'
      startX = touches[0].clientX
      startY = touches[0].clientY

      const checkOffset = 20
      const isRight =
        containerEl.offsetLeft + containerEl.offsetWidth - checkOffset < startX
      const isBottom =
        containerEl.offsetTop + containerEl.offsetHeight - checkOffset < startY
      if (isRight && isBottom) return

      moved = [containerEl.offsetLeft, containerEl.offsetTop]
      const onMoveHandler = ({ touches }) => {
        onMove(touches[0].clientX, touches[0].clientY)
      }
      const onUpHandler = () => {
        containerEl.style.transitionDuration = animationDuration + 'ms'
        window.removeEventListener('touchmove', onMoveHandler)
        window.removeEventListener('touchend', onUpHandler)
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
      window.addEventListener('touchmove', onMoveHandler)
      window.addEventListener('touchend', onUpHandler)
    }
  else
    containerEl.onmousedown = ({ which, clientX, clientY, id }) => {
      if (which !== 1) return
      containerEl.style.transitionDuration = '0s'
      startX = clientX
      startY = clientY
      const checkOffset = 20
      const isRight =
        containerEl.offsetLeft + containerEl.offsetWidth - checkOffset < startX
      const isBottom =
        containerEl.offsetTop + containerEl.offsetHeight - checkOffset < startY
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
      containerEl.toogleIcon(true)
    }, animationDuration)
  }
  containerEl.show = () => {
    containerEl.toogleIcon(false)
    const isColabs = containerEl.getAttribute('is') === 'colabsed'
    if (!isColabs) return
    const overScreen =
      containerEl.offsetTop > window.innerHeight / 2 ||
      containerEl.offsetLeft > window.innerWidth / 2

    containerEl.setAttribute('is', overScreen ? 'default' : 'visible')
    containerEl.classList.remove('hide-child')
    containerEl.corectPosition()
    setTimeout(() => {
      containerEl.corectPosition()
    }, animationDuration)
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

  document.getElementById(parentId).append(containerEl)
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

Logger.log = (msg) => Logger({ msg, type: 'infor' })
Logger.warn = (msg) => Logger({ msg, type: 'warn' })
Logger.error = (msg) => Logger({ msg, type: 'error' })
Logger.debug = (msg) => Logger({ msg, type: 'debug' })

const checkImage = (i = 0) => {
  const posibleImgs = [
    '../android-chrome-512x512.png',
    '../logo.png',
    '../favicon.ico',
    '../public/android-chrome-512x512.png',
    '../public/logo.png',
    '../public/favicon.ico',
    '../../../public/android-chrome-512x512.png',
    '../../../public/logo.png',
    '../../../public/favicon.ico',
    '../../public/android-chrome-512x512.png',
    '../../public/logo.png',
    '../../public/favicon.ico',
    './android-chrome-512x512.png',
    './logo.png',
    './favicon.ico'
  ]

  try {
    const img = new Image()
    img.src = posibleImgs[i]
    img.onload = () => {
      console.debug({ i, icon: posibleImgs[i] })
      containerEl.toogleIcon = (show) => {
        containerEl.style.backgroundImage = show
          ? `url("${posibleImgs[i]}")`
          : 'none'
      }
      containerEl.toogleIcon(true)
    }
    img.onerror = () => {
      i++
      if (i < posibleImgs.length) checkImage(i)
    }
  } catch (e) {}
}
