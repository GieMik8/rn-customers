import * as React from 'react'
import { Platform } from 'react-native'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'
import {
  Container,
  Header,
  Footer,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Content,
  Right,
  FooterTab,
  Text,
} from 'native-base'

import { RootState, RootAction } from '@/store'
import { Customer } from '@/types'
import { getCustomers } from '@/modules/customers/selectors'
import { CustomersList } from '@/containers'
import { initDeleteCustomer } from '@/modules/customers/actions'

type StateProps = {
  customers: Customer[]
}

type DispatchProps = {
  removeCustomer: (id: string) => void
}

type Props = StateProps & DispatchProps & NavigationScreenProps

class MainScreen extends React.Component<Props> {
  goToEdit = (params: { id: string }) =>
    this.props.navigation.navigate('Edit', params)
  goToCreate = () => this.props.navigation.navigate('Create')

  removeCustomer = (id: string) => {
    this.props.removeCustomer(id)
  }

  editCustomer = (id: string) => {
    this.goToEdit({ id })
  }

  renderContent = () => {
    const { customers } = this.props
    if (!customers.length) {
      return (
        <Body
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon
            style={{ fontSize: 50, color: '#495057' }}
            name="frown-open"
            type="FontAwesome5"
          />
          <Text
            style={{ textAlign: 'center', marginTop: 15, marginBottom: 20 }}
          >
            No Customers
          </Text>
          <Button
            onPress={this.goToCreate}
            iconRight
            rounded
            style={{ backgroundColor: '#495057' }}
          >
            <Text>Create one</Text>
            <Icon style={{ fontSize: 15 }} type="FontAwesome5" name="plus" />
          </Button>
        </Body>
      )
    }
    return (
      <CustomersList
        customers={customers}
        onRemove={this.removeCustomer}
        onEdit={this.editCustomer}
      />
    )
  }

  render() {
    console.log('[Customers]', this.props.customers)
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Customers</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.goToCreate}>
              <Icon
                style={{
                  fontSize: 20,
                  color: Platform.OS === 'ios' ? '#495057' : '#FFF',
                }}
                name="user-plus"
                type="FontAwesome5"
              />
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={{ flexGrow: 1 }}>
          {this.renderContent()}
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Swipe right to edit customer, left to delete</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  customers: getCustomers(state),
})

const mapDispatchToProps = (
  dispatch: React.Dispatch<RootAction>
): DispatchProps => ({
  removeCustomer: (id: string) => dispatch(initDeleteCustomer(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen)
