import React from 'react'
import {
  List,
  ListItem,
  Thumbnail,
  Text,
  Body,
  Right,
  Left,
  Icon,
} from 'native-base'

import { Customer } from '@/types'

const customerItem = (customer: Customer) => (
  <ListItem avatar>
    <Left>
      <Icon style={{ fontSize: 15 }} name="user" type="FontAwesome5" />
    </Left>
    <Body>
      <Text>{customer.name}</Text>
      <Text note>{customer.surname}</Text>
    </Body>
    <Right>
      <Text note>3:43 pm</Text>
    </Right>
  </ListItem>
)

export default customerItem
