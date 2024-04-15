
// localStorage.setItem('debug', 'true')
if (localStorage.getItem('debug') != null) {
  console.log('Debug mode enabled!')
  let savedData: string | null = null

  setInterval(() => {
    const script = document.querySelector('script')
    const scriptUrl = script?.getAttribute('src')!
    fetch(scriptUrl)
      .then((response) => response.text())
      .then((newData) => {
        const prevData = savedData
        savedData = newData
        if (prevData === newData) {
          console.log('Script not changed!')
          return
        }
        if (prevData != null) window.location.reload()
      })
      .catch((error) => console.error('Error:', error))
  }, 1000)
}
