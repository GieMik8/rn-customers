import React, { Component } from 'react'
import { Keyboard } from 'react-native'
import { Item, Icon, Input, Text, View, List, ListItem } from 'native-base'

import { Api } from '@/services/index'
import { Subject, Observable, empty } from 'rxjs'
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
    this.state = { searchString: props.address.readable || '', predictions: [] }
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

  onInput = (text: string) => {
    this.setState({ searchString: text })
    this.search$.next(text)
  }

  onBlur = () => {
    Keyboard.dismiss()
    this.setState({ predictions: [] })
  }

  selectPrediction = (id: string) =>
    Api.geocoding
      .getInfoByPlaceId(id)
      .pipe(
        catchError(err => {
          console.log(err)
          return empty()
        })
      )
      .subscribe((res: PlaceDetailsResponse) => {
        if (res.status !== 'OK') return
        const place = utils.getAddressFromDetails(res.result, id)
        Keyboard.dismiss()
        this.setState({ searchString: place.readable, predictions: [] })
        this.props.onFound(place)
      })

  renderSearchResults = (predictions: PlaceAutocompleteResult[]) => (
    <View style={{ backgroundColor: '#F2F2F2' }}>
      <List>
        {predictions.map((prediction, index) => (
          <ListItem
            key={index}
            onPress={this.selectPrediction.bind(this, prediction.place_id)}
          >
            <Text>{prediction.description}</Text>
          </ListItem>
        ))}
      </List>
    </View>
  )

  render() {
    return (
      <View>
        <Item>
          <Input
            onBlur={this.onBlur}
            value={this.state.searchString}
            onChangeText={this.onInput}
            placeholder="Search"
          />
          <Icon active type="FontAwesome5" name="search-location" />
        </Item>
        {this.state.predictions.length
          ? this.renderSearchResults(this.state.predictions)
          : null}
      </View>
    )
  }
}
