import Client from './client'
import urlJoin from 'url-join'

export default class extends Client {
  baseUrl: string
  key: string
  constructor(baseUrl: string, key: string) {
    super()
    this.baseUrl = baseUrl
    this.key = key
  }

  autocomplete(input: string) {
    return this.get(urlJoin(this.baseUrl, 'place/autocomplete/json'), {
      input,
      types: 'address',
      key: this.key,
    })
  }

  getInfoByPlaceId(placeid: string) {
    return this.get(urlJoin(this.baseUrl, 'place/details/json'), {
      placeid,
      fields: [
        'address_component',
        'adr_address',
        'alt_id',
        'formatted_address',
        'geometry',
        'plus_code',
      ].join(','),
      key: this.key,
    })
  }

  saerchPlace(query: string) {
    return this.get(urlJoin(this.baseUrl, 'place/textsearch/json'), {
      query,
      key: this.key,
    })
  }
}
