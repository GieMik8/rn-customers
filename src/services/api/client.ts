import { of, throwError } from 'rxjs'
import { ajax, AjaxRequest, AjaxError } from 'rxjs/ajax'
import { mergeMap, catchError } from 'rxjs/operators'
import _ from 'lodash'
import queryString, { InputParams } from 'query-string'
import urljoin from 'url-join'

export default class {
  defaultHeaders = {
    'Content-Type': 'application/json',
  }

  makeRequest = (options: string | AjaxRequest) =>
    ajax(options).pipe(
      mergeMap(obj => of(obj.response)),
      catchError((err: AjaxError) => {
        let data: { message: string; status?: number } = {
          message: 'Oops! Please check your network connection',
        }

        if (err.response) {
          if (typeof err.response === 'string') {
            data = { message: err.response, status: err.status }
          } else {
            data = { ...err.response, status: err.status }
          }
        }

        // temporary until backend has unified error response
        if (typeof data.message === 'object') {
          data.message = '[Error] - check error message'
        }

        return throwError(data)
      })
    )

  get = (url: string, params?: InputParams, headers = {}) => {
    let targetUrl = url
    if (params) {
      targetUrl = _.isPlainObject(params)
        ? urljoin(url, `?${queryString.stringify(params)}`)
        : url
    }

    return this.makeRequest({
      method: 'GET',
      url: targetUrl,
      headers: _.merge({}, this.defaultHeaders, headers),
    })
  }
}
