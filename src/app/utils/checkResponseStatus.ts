export const checkResponseStatus = (
  res: { status: number; response: string },
  setState: (str: string) => void,
  text = 'Successfully updated'
): void => {
  if (res.status === 200) {
    setState(text)
  } else if (res.status !== 200 && res.response) {
    setState(JSON.parse(res.response).reason)
  }

  setTimeout(() => {
    setState('')
  }, 5000)
}
