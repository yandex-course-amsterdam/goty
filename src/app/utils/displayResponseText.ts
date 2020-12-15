export const displayResponseText = (
  setState: (str: string) => void,
  text = 'Successfully updated'
): void => {
  setState(text)
  setTimeout(() => {
    setState('')
  }, 5000)
}
