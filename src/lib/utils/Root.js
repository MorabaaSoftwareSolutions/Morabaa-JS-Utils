const Root = {
  theme:
    localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'),
  toggleTheme: (theme) => {
    if (typeof theme !== 'string')
      theme = Root.theme === 'dark' ? 'light' : 'dark'
    Root.setTheme(theme)
  },
  setTheme: (theme) => {
    if (theme) {
      Root.theme = theme
      localStorage.setItem('theme', theme)
    }
    document.documentElement.className = Root.theme
  }
}
export default Root
