import axios from 'axios'

import { handleRequestData, handleResponseData } from 'app/utils'

const api = axios.create({
  withCredentials: true,
  timeout: 10000
})

api.interceptors.request.use(
  (config) => {
    // Не вся апи в яндексе в underscore_case + формдату обрабатывать тоже не нужно
    if (!config.data || config.url?.match(/(leaderboard|avatar|password)/)) {
      return config
    }
    config.data = handleRequestData(config.data)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (config) => {
    // Признак отличия моей апи и апи яндекса
    if (config.data.payload) {
      config.data.payload = handleResponseData(config.data.payload)
    } else {
      config.data = handleResponseData(config.data)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export { api }
