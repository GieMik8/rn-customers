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
  Segment,
} from 'native-base'

import { RootState, RootAction } from '@/store'
import { Customer } from '@/types'
import { getCustomers, getGridModeEnabled } from '@/modules/customers/selectors'
import { CustomersList, CustomersGridList } from '@/containers'
import { initDeleteCustomer, setGridMode } from '@/modules/customers/actions'

type StateProps = {
  customers: Customer[]
  gridMode: boolean
}

type DispatchProps = {
  removeCustomer: (id: string) => void
  setGridMode: (bool: boolean) => void
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
    const { customers, gridMode } = this.props
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
    if (gridMode) {
      return this.renderGridCustomers()
    }
    return this.renderCustomers()
  }

  renderGridCustomers = () => (
    <CustomersGridList
      onRemove={this.removeCustomer}
      onEdit={this.editCustomer}
      customers={this.props.customers}
    />
  )

  renderCustomers = () => (
    <CustomersList
      customers={this.props.customers}
      onRemove={this.removeCustomer}
      onEdit={this.editCustomer}
    />
  )

  render() {
    return (
      <Container>
        <Header hasSegment>
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
        <Segment>
          <Button
            first
            active={!this.props.gridMode}
            onPress={this.props.setGridMode.bind(this, false)}
          >
            <Icon type="Entypo" name="list" />
          </Button>
          <Button
            last
            active={this.props.gridMode}
            onPress={this.props.setGridMode.bind(this, true)}
          >
            <Icon type="Entypo" name="grid" />
          </Button>
        </Segment>
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
  gridMode: getGridModeEnabled(state),
})

const mapDispatchToProps = (
  dispatch: React.Dispatch<RootAction>
): DispatchProps => ({
  removeCustomer: (id: string) => dispatch(initDeleteCustomer(id)),
  setGridMode: bool => dispatch(setGridMode(bool)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen)
