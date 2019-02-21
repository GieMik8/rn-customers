import * as React from 'react'
import { View, Item, Input, Icon, Button, Text } from 'native-base'

import { Customer } from '@/types'

type Props = {
  onSubmit: (customer: Customer) => void
  initialValue?: Customer
}

type State = {
  form: Customer
}

const form: Customer = {
  id: '',
  name: '',
  surname: '',
  email: '',
  address: {
    city: '',
    street: '',
    houseNumber: '',
    zipCode: '',
  },
}

export default class CustomerForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      form: props.initialValue || form,
    }
  }

  submit = () => {}

  render() {
    return (
      <View>
        <Item success>
          <Input placeholder="Name" />
          <Icon name="checkmark-circle" />
        </Item>
        <Item error>
          <Input placeholder="Surname" />
          <Icon name="checkmark-circle" />
        </Item>
        <Item>
          <Input placeholder="Email" />
          <Icon name="checkmark-circle" />
        </Item>
        <Item>
          <Input placeholder="Address" />
          <Icon name="checkmark-circle" />
        </Item>
        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            onPress={this.submit}
            iconRight
            rounded
            style={{ backgroundColor: '#495057' }}
          >
            <Text>Create</Text>
            <Icon style={{ fontSize: 15 }} type="FontAwesome5" name="plus" />
          </Button>
        </View>
      </View>
    )
  }
}
