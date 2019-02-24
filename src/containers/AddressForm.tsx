import React, { Component } from 'react'
import { View, Text } from 'native-base'

import { Form, AddressSearch } from '@/containers'
import { FormValue, Field, Address, FormPurpose } from '@/types'
import { Api } from '@/services'
import utils from '@/utils'
import { PlaceSearchResponse, PlaceDetailsResponse } from '@google/maps'

type Props = {
  address?: Address
  onSubmit: (value: Address) => void
}

type State = {
  initialAddress: Address
  address: Address
  form: FormValue<string>
  purpose: FormPurpose
}

export default class AddressForm extends Component<Props, State> {
  form: any
  constructor(props: Props) {
    super(props)
    const initialAddress = props.address || new Address()
    this.state = {
      initialAddress,
      purpose: 'create',
      address: initialAddress,
      form: {
        city: new Field<string>(
          'city',
          initialAddress.city,
          'text',
          ['required', 'text'],
          'City'
        ),
        street: new Field<string>(
          'street',
          initialAddress.street,
          'text',
          ['required', 'text'],
          'Street'
        ),
        houseNumber: new Field<string>(
          'houseNumber',
          initialAddress.houseNumber,
          'text',
          ['required', 'text'],
          'House number'
        ),
        zipCode: new Field<string>(
          'zipCode',
          initialAddress.zipCode,
          'text',
          ['number', { minLength: 4 }],
          'Zip code'
        ),
      },
    }
  }

  findPlace = async (address: Address): Promise<Address> => {
    try {
      const search: PlaceSearchResponse = await Api.geocoding
        .saerchPlace(
          `${address.city || ''} ${address.street ||
            ''} ${address.houseNumber || ''}`
        )
        .toPromise()
      if (search.status !== 'OK') {
        throw new Error('Could not find place')
      }
      const details: PlaceDetailsResponse = await Api.geocoding
        .getInfoByPlaceId(search.results[0].place_id)
        .toPromise()
      const place = utils.getAddressFromDetails(
        details.result,
        search.results[0].place_id
      )
      return place
    } catch (err) {
      return new Address()
    }
  }

  submit = async (form: FormValue) => {
    const map: any = {}
    Object.keys(form).forEach((fieldName: string) => {
      map[fieldName] = form[fieldName].value
    })
    const place = { ...this.state.address, ...map }
    const address = await this.findPlace(place)
    this.props.onSubmit(
      new Address(
        address.city,
        address.street,
        address.houseNumber,
        address.zipCode,
        address.readable,
        address.country,
        address.geometry,
        address.placeId
      )
    )
  }

  addressFound = (address: any) => {
    const { form } = this.state
    Object.keys(address).forEach((key: string) => {
      if (!form[key]) return
      form[key].value = address[key]
    })
    this.setState({ address, form })
  }

  render() {
    return (
      <View>
        <AddressSearch
          onFound={this.addressFound}
          address={this.state.address}
        />
        <Text>{JSON.stringify(this.state.address)}</Text>
        <Form
          purpose={this.state.purpose}
          fields={this.state.form}
          onSubmit={this.submit}
        />
      </View>
    )
  }
}
