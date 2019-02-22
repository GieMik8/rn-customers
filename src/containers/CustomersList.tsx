import React, { Component, ReactText } from 'react'
import { ListView } from 'react-native'
import { Button, Icon, List, Text, View } from 'native-base'

import { Customer } from '@/types'
import { CustomerItem } from '@/ui'

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
    console.log(id)
    this.props.onEdit(id)
  }

  deleteRow(
    customer: Customer,
    secId: ReactText,
    rowId: ReactText,
    rowMap: any
  ) {
    rowMap[`${secId}${rowId}`].props.closeRow()
    const newData = [...this.state.listViewData]
    newData.splice(+rowId, 1)
    this.removeCustomer(customer.id)
    this.setState({ listViewData: newData })
  }

  renderRow = (customer: Customer) => (
    <CustomerItem
      onPress={this.editCustomer.bind(this, customer.id)}
      customer={customer}
    />
  )

  renderLeftHiddenRow = (customer: Customer) => (
    <Button full onPress={this.editCustomer.bind(this, customer.id)}>
      <Icon active name="user-edit" type="FontAwesome5" />
    </Button>
  )

  renderRightHiddenRow = (
    customer: Customer,
    secId: ReactText,
    rowId: ReactText,
    rowMap: object
  ) => {
    return (
      <Button
        full
        danger
        onPress={this.deleteRow.bind(this, customer, secId, rowId, rowMap)}
      >
        <Icon active name="trash" type="FontAwesome5" />
      </Button>
    )
  }

  render() {
    console.log('[CustomerList] render', this.state.listViewData)
    return (
      <View style={{ marginTop: 25, marginBottom: 55 }}>
        <List
          leftOpenValue={60}
          rightOpenValue={-65}
          dataSource={this.listData.cloneWithRows(this.state.listViewData)}
          renderRow={this.renderRow}
          renderLeftHiddenRow={this.renderLeftHiddenRow}
          renderRightHiddenRow={this.renderRightHiddenRow}
        />
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 25,
          }}
        >
          <Text note style={{ textAlign: 'right' }}>
            customers: {this.state.listViewData.length}
          </Text>
        </View>
      </View>
    )
  }
}
