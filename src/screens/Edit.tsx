import * as React from 'react'
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

import { RootState, RootAction } from '@/store'
import { CustomerForm } from '@/containers'
import { Customer } from '@/types'
import { getCustomerById } from '@/modules/customers/selectors'

type StateProps = {
  customer?: Customer
}

type DispatchProps = {}

type Props = StateProps & DispatchProps & NavigationScreenProps<{ id: string }>

class EditScreen extends React.Component<Props> {
  componentDidMount() {
    console.log(this.props.customer)
  }
  goBack = () => this.props.navigation.goBack()

  openLocationModal = () => {
    this.props.navigation.navigate('LocationModal')
  }

  editCustomer = (customer: Customer) => {
    console.log('edit', customer)
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon
                style={{ fontSize: 20, color: '#495057' }}
                name="chevron-left"
                type="FontAwesome5"
              />
            </Button>
          </Left>
          <Body>
            <Title>Edit Customer</Title>
          </Body>
          {/* <Right /> */}
        </Header>
        <Content contentContainerStyle={{ margin: 20 }}>
          <CustomerForm
            customer={this.props.customer}
            onSubmit={this.editCustomer}
          />
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state: RootState, props: Props): StateProps => ({
  customer: getCustomerById(state, props.navigation.getParam('id')),
})

const mapDispatchToProps = (
  dispatch: React.Dispatch<RootAction>
): DispatchProps => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditScreen)
