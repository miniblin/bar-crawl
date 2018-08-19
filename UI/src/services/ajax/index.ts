import { Observable } from 'rxjs'
import { ajax as ajaxObservable, AjaxRequest, AjaxResponse } from 'rxjs/ajax'

let BASE_URL = ''

interface IApiParams {
  endpoint: string
  token?: string,
  data?: any
}

export function get (params: IApiParams) {
  return ajax(params.endpoint, 'GET')
}

export function post (params: IApiParams) {
  return ajax(params.endpoint, 'POST', params.data)
}

function ajax (
  endPointPath: string,
  method: string,
  data?: any,
  accessToken: string = ''
): Observable<AjaxResponse> {
  const request: AjaxRequest = {
    body: data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ['Content-Type']: 'application/json'
    },
    method,
    url: `${BASE_URL}${endPointPath}`
  }

  return ajaxObservable(request)
}

export function setBaseUrl (url: string) {
  BASE_URL = url
}
