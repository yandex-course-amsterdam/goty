export const startServiceWorker = (path: string): void => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(path)
    })
  }
}
