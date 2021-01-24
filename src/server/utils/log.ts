export const log = (
  controller: string,
  method: string,
  error: Error,
  full = false
): void => {
  console.log(
    `[${controller}: ${method}] ${full ? error.stack : error.message}`
  )
}
