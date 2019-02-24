import React, { Component } from 'react'
import { ListView, Platform } from 'react-native'
import {
  Text,
  View,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Button,
  Icon,
} from 'native-base'

import { Customer } from '@/types'

type Props = {
  customers: Customer[]
  onRemove: (id: string) => void
  onEdit: (id: string) => void
}

type State = {
  basic: boolean
  listViewData: Customer[]
}

export default class CustomersList extends Component<Props, State> {
  listData = new ListView.DataSource({
    rowHasChanged: () => false,
  })
  constructor(props: Props) {
    super(props)
    this.listData = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    })
    this.state = {
      basic: true,
      listViewData: props.customers,
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ listViewData: nextProps.customers })
  }

  removeCustomer(id: string) {
    this.props.onRemove(id)
  }

  editCustomer(id: string) {
    this.props.onEdit(id)
  }

  renderCustomer = (customer: Customer) => (
    <View style={{ padding: 5, width: '50%' }}>
      <Card
        style={{ minHeight: Platform.OS === 'ios' ? 260 : 300 }}
        key={customer.id}
      >
        <CardItem header bordered>
          <Text>
            {customer.name} {customer.surname}
          </Text>
        </CardItem>
        <CardItem bordered style={{ flexGrow: 1 }}>
          <Body>
            <Text style={{ marginBottom: 10 }}>{customer.email}</Text>
            <Text>{customer.address.readable}</Text>
          </Body>
        </CardItem>
        <CardItem bordered footer>
          <Left>
            <Button
              onPress={this.editCustomer.bind(this, customer.id)}
              transparent
            >
              <Icon name="user-edit" type="FontAwesome5" />
            </Button>
          </Left>
          <Body />
          <Right>
            <Button
              onPress={this.removeCustomer.bind(this, customer.id)}
              danger
              transparent
            >
              <Icon name="trash" type="FontAwesome5" />
            </Button>
          </Right>
        </CardItem>
      </Card>
    </View>
  )

  render() {
    return (
      <View style={{ marginTop: 25, marginBottom: 55 }}>
        <ListView
          contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
          dataSource={this.listData.cloneWithRows(this.state.listViewData)}
          renderRow={this.renderCustomer}
        />
      </View>
    )
  }
}
