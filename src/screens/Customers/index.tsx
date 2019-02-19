import * as React from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'

import { RootState, RootAction } from '@/store'
import { fetchCustomers } from '@/modules/customers/actions'
import { Customer } from '@/types'
import { getCustomers } from '@/modules/customers/selectors'

type StateProps = {
  customers: Customer[]
}

type DispatchProps = {
  request: (param: string) => void
}

type Props = StateProps & DispatchProps & NavigationScreenProps

class MainScreen extends React.Component<Props> {
  componentDidMount() {
    this.props.request('Hello from Test')
  }

  goToEdit = () => this.props.navigation.navigate('Edit')
  goToCreate = () => this.props.navigation.navigate('Create')

  render() {
    return (
      <View>
        <Text>Customers</Text>
        <Button title="Edit Customer" onPress={this.goToEdit} />
        <Button title="Create Customer" onPress={this.goToCreate} />
      </View>
    )
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  customers: getCustomers(state),
})

const mapDispatchToProps = (
  dispatch: React.Dispatch<RootAction>
): DispatchProps => ({
  request: param => dispatch(fetchCustomers.request(param)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen)
