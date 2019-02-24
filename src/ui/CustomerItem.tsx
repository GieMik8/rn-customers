import React, { FunctionComponent } from 'react'
import { ListItem, Text, Body, Left, Icon } from 'native-base'

import { Customer } from '@/types'

type Props = {
  customer: Customer
  onPress: () => void
}

const customerItem: FunctionComponent<Props> = ({ onPress, customer }) => (
  <ListItem
    avatar
    style={{
      paddingHorizontal: 20,
      paddingVertical: 6,
    }}
    onPress={onPress}
  >
    <Left
      style={{
        width: 30,
        justifyContent: 'center',
      }}
    >
      <Icon name="user" type="FontAwesome5" />
    </Left>
    <Body>
      <Text style={{}}>
        {customer.name} {customer.surname}
      </Text>
      <Text note>{customer.email}</Text>
    </Body>
  </ListItem>
)

export default customerItem
