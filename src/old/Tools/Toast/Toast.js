import { TimedCallback } from '../../utils'
import { Div, P, Span } from '../Tools'

const Language = {}

const colorByType = {
  default: { bg: '#d5d8db', text: '#2f3b4b', border: '#2f3b4b' },
  info: { bg: '#d5eaf0', text: '#216b81', border: '#2f96b4' },
  success: { bg: '#edf5d2', text: '#4c5923', border: '#8ea641' },
  warn: { bg: '#feeacd', text: '#c47504', border: '#f89406' },
  // error: { bg: "#dd3643", text: "#dd3643", border: "#dd3643" },
  error: { bg: '#fce0e0', text: '#bb4d4d', border: '#ee6363' },
  primary: { bg: '#ffffff', text: '#2f3b4b', border: '#dddddd' },
  secondary: { bg: '#999999', text: '#2f3b4b', border: '#999999' }
}

const init = () => {
  if (document.getElementById('toast-holder')) return
  const toastHolder = Div({ id: 'toast-holder', className: 'toast-holder' })
  document.body.append(toastHolder)
}
init()

const Toast = ({
  title = '',
  content = '',
  timeout = 4000,
  type = 'default',
  haveBorder: displayBorder = true
}) => {
  let id = title + content
  const { bg, text, border } = colorByType[type]
  let style =
    (displayBorder
      ? `background-color:#fff; border-left: solid 8px ${border};`
      : `background-color:${bg};`) + `color:${text};`

  if (timeout < 1 || TimedCallback.alreadyPending(id) === false)
    createNewToast()
  else TimedCallback.restart({ id, timeout })

  function createNewToast() {
    const infoContainer = P(
      { style, className: 'toast-container info-fade-in' },
      [
        P({ className: 'row-center' }, [
          Span({
            className: 'x',
            style: `background-color:${text}aa;`,
            onclick: removeMessage
          }),
          Span({ innerText: Language[title] || title })
        ]),
        content
          ? Span({
              className: 'toast-content',
              innerText: Language[content] || content
            })
          : ''
      ]
    )

    function onRepated() {
      infoContainer.classList.remove('info-fade-in')
      infoContainer.classList.add('shake')
      setTimeout(() => {
        infoContainer.classList.remove('shake')
      }, 300)
    }

    function removeMessage() {
      infoContainer.classList.add('info-fade-out')
      infoContainer.style.maxHeight = infoContainer.offsetHeight + 'px'
      setTimeout(() => {
        infoContainer.style.padding = '0px'
        infoContainer.style.marginBottom = '0px'
        infoContainer.style.maxHeight = '0px'
      }, 50)

      setTimeout(() => infoContainer.remove(), 500)
      TimedCallback.remove(id)
    }

    document.getElementById('toast-holder').append(infoContainer)
    TimedCallback.create({ id, timeout, callback: removeMessage, onRepated })
  }
}

Toast.default = ({ title, content, timeout }) =>
  Toast({ title, content, timeout, type: 'default' })
Toast.info = ({ title, content, timeout }) =>
  Toast({ title, content, timeout, type: 'info' })
Toast.success = ({ title, content, timeout }) =>
  Toast({ title, content, timeout, type: 'success' })
Toast.warn = ({ title, content, timeout }) =>
  Toast({ title, content, timeout, type: 'warn' })
Toast.error = ({ title, content, timeout }) =>
  Toast({ title, content, timeout, type: 'error' })
Toast.primary = ({ title, content, timeout }) =>
  Toast({ title, content, timeout, type: 'primary' })
Toast.secondary = ({ title, content, timeout }) =>
  Toast({ title, content, timeout, type: 'secondary' })

export default Toast
