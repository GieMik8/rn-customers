import { AddressComponent, PlaceDetailsResult } from '@google/maps'

import { AddressCompTypes } from '@/types'
import Validator from './validator'
class Utils extends Validator {
  public genId: () => string = () =>
    `id_${Math.random()
      .toString(36)
      .substr(2, 16)}`

  public capitalize = (text: string): string =>
    `${text[0].toUpperCase()}${text.slice(1)}`

  public getTypesOfPlace = (
    comps: AddressComponent[],
    types: AddressCompTypes
  ): any => {
    const place: any = {}
    comps.forEach(comp => {
      comp.types.forEach(type => {
        const index = types.indexOf(type)
        if (index >= 0) {
          const typ = types[index]
          place[typ] = comp.long_name
        }
      })
    })
    return place
  }

  public getAddressFromDetails = (result: PlaceDetailsResult, id: string) => {
    const { lat, lng } = result.geometry.location
    const {
      locality,
      street_address,
      street_number,
      route,
      postal_code,
      country,
    } = this.getTypesOfPlace(result.address_components, [
      'locality',
      'street_address',
      'street_number',
      'route',
      'postal_code',
      'country',
    ])
    const address = {
      country,
      geometry: { latitude: lat, longitude: lng },
      city: locality,
      placeId: id,
      readable: result.formatted_address,
      street: street_address || route,
      houseNumber: street_number,
      zipCode: postal_code,
    }
    return address
  }
}

export default new Utils()
