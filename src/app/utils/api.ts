import { camelToSnakeCase, snakeToCamelCase } from 'app/utils'

export const handleRequestData = (data: unknown): unknown => {
  let dataCopy = JSON.parse(JSON.stringify(data))

  dataCopy = Object.entries(dataCopy).reduce<Record<string, unknown>>(
    (acc, item) => {
      const [key, value] = item as [string, unknown]

      if (Array.isArray(value)) {
        acc[camelToSnakeCase(key)] = value.map(handleRequestData)
      } else if (!Array.isArray(value) && typeof value === 'object' && value) {
        acc[camelToSnakeCase(key)] = handleRequestData(value)
      } else {
        acc[camelToSnakeCase(key)] = value
      }

      return acc
    },
    {}
  )

  return dataCopy
}

export const handleResponseData = (data: unknown): unknown => {
  let dataCopy = JSON.parse(JSON.stringify(data))

  if (Array.isArray(dataCopy)) {
    dataCopy = dataCopy.map(handleResponseData)
  } else {
    dataCopy = Object.entries(dataCopy).reduce<Record<string, unknown>>(
      (acc, item) => {
        const [key, value] = item as [string, unknown]

        if (Array.isArray(value)) {
          acc[snakeToCamelCase(key)] = value.map(handleResponseData)
        } else if (
          !Array.isArray(value) &&
          typeof value === 'object' &&
          value
        ) {
          acc[snakeToCamelCase(key)] = handleResponseData(value)
        } else {
          acc[snakeToCamelCase(key)] = value
        }

        return acc
      },
      {}
    )
  }

  return dataCopy
}
