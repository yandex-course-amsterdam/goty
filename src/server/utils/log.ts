interface LogProps {
  controller: string
  method: string
  error: Error
  full?: boolean
}

interface LogFunc {
  (params: LogProps): void
}

export const log: LogFunc = ({
  controller,
  method,
  error,
  full = false
}: LogProps): void => {
  console.log(
    `[${controller}: ${method}] ${full ? error.stack : error.message}`
  )
}
