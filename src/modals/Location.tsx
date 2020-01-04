import * as React from 'react'
import { Platform } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { Button, Container, Header, Icon, Right, Content } from 'native-base'

import { AddressForm } from '@/containers'
import { Address } from '@/types'

type Props = NavigationScreenProps<{
  address: Address
  onSubmitAddress: (address: Address) => void
}>

type State = {
  address: Address
}

export default class LocationModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const initialAddress = props.navigation.getParam('address') || new Address()
    this.state = {
      address: initialAddress,
    }
  }

  goBack = () => this.props.navigation.goBack()

  submit = (address: Address) => {
    this.props.navigation.getParam('onSubmitAddress')(address)
    this.props.navigation.goBack()
  }

  render() {
    return (
      <Container>
        <Header>
          <Right>
            <Button transparent onPress={this.goBack}>
              <Icon
                style={{
                  fontSize: 20,
                  color: Platform.OS === 'ios' ? '#495057' : '#FFF',
                }}
                name="times"
                type="FontAwesome5"
              />
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={{ margin: 20 }}>
          <AddressForm address={this.state.address} onSubmit={this.submit} />
        </Content>
      </Container>
    )
  }
}
