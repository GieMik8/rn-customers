import React, { Component } from 'react'
import { Header, Item, Icon, Button, Input, Text, View } from 'native-base'

import { Api } from '@/services/index'
import { Subject, Observable } from 'rxjs'
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
} from 'rxjs/operators'
import utils from '@/utils'
import { Address } from '@/types'
import {
  PlaceAutocompleteResult,
  PlaceAutocompleteResponse,
  PlaceDetailsResponse,
} from '@google/maps'

type Props = {
  address: Address
  onFound: (address: Address) => void
}

type State = {
  searchString: string
  predictions: PlaceAutocompleteResult[]
}

export default class AddressSearch extends Component<Props, State> {
  search$ = new Subject<string>()
  constructor(props: Props) {
    super(props)
    this.search(this.search$).subscribe((res: PlaceAutocompleteResponse) => {
      if (res.status === 'OK') this.onAutocomplete(res.predictions)
    })
    this.state = { searchString: '', predictions: [] }
  }

  onAutocomplete = (predictions: PlaceAutocompleteResult[]) => {
    this.setState({ predictions })
  }

  search(searches$: Observable<string>) {
    return searches$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) => Api.geocoding.autocomplete(term))
    )
  }

  onInput = (text: string) => this.search$.next(text)

  selectPrediction = (id: string) =>
    Api.geocoding
      .getInfoByPlaceId(id)
      .pipe(catchError(err => err))
      .subscribe((res: PlaceDetailsResponse) => {
        if (res.status !== 'OK') return
        const place = utils.getAddressFromDetails(res.result, id)
        this.props.onFound(place)
      })

  render() {
    return (
      <View>
        <Header searchBar rounded>
          <Item>
            <Icon type="FontAwesome5" name="search-location" />
            <Input onChangeText={this.onInput} placeholder="Search" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <View>
          <View>
            {this.state.predictions.map((prediction, index) => (
              <Button
                transparent
                full
                key={index}
                onPress={this.selectPrediction.bind(this, prediction.place_id)}
              >
                <Text>
                  {index}: {prediction.description}
                </Text>
              </Button>
            ))}
          </View>
          <Text>Selected:{this.state.searchString}</Text>
        </View>
      </View>
    )
  }
}
