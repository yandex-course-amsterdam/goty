import { AxiosResponse } from 'axios'
import { FormikValues } from 'formik'

import { api } from './index'

enum RequestRoot {
  feedback = '/feedback'
}

const baseURL = '/'

export const sendFeedback = (body: FormikValues): Promise<AxiosResponse> =>
  api.post(RequestRoot.feedback, body, { baseURL })
