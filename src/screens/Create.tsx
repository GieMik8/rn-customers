import * as React from 'react'
import { Platform } from 'react-native'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'
import {
  Container,
  Header,
  Button,
  Body,
  Left,
  Icon,
  Title,
  Content,
} from 'native-base'

import { create } from '@/modules/customers/actions'
import { RootState, RootAction } from '@/store'
import { CustomerForm } from '@/containers'
import { Customer } from '@/types'

type StateProps = {}

type DispatchProps = {
  createCustomer: (customer: Customer) => void
}

type Props = StateProps & DispatchProps & NavigationScreenProps

class CreateScreen extends React.Component<Props> {
  goBack = () => this.props.navigation.goBack()

  openLocationModal = () => {
    this.props.navigation.navigate('LocationModal')
  }

  createCustomer = (customer: Customer) => {
    this.props.createCustomer(customer)
    this.props.navigation.navigate('Customers')
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon
                style={{
                  fontSize: 20,
                  color: Platform.OS === 'ios' ? '#495057' : '#FFF',
                }}
                name="chevron-left"
                type="FontAwesome5"
              />
            </Button>
          </Left>
          <Body>
            <Title>Create Customer</Title>
          </Body>
          {/* <Right /> */}
        </Header>
        <Content contentContainerStyle={{ margin: 20 }}>
          <CustomerForm onSubmit={this.createCustomer} />
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state: RootState): StateProps => ({})

const mapDispatchToProps = (
  dispatch: React.Dispatch<RootAction>
): DispatchProps => ({
  createCustomer: customer => dispatch(create(customer)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateScreen)
