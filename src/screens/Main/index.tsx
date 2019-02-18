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
  request: (para: string) => void
}

type Props = StateProps & DispatchProps & NavigationScreenProps

class MainScreen extends React.Component<Props> {
  componentDidMount() {
    this.props.request('Hello from Test')
  }

  goToEdit = () => this.props.navigation.navigate('Edit')

  render() {
    return (
      <View>
        <Text>Main Screen</Text>
        <Button title="Go To Edit" onPress={this.goToEdit} />
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
  request: para => dispatch(fetchCustomers.request(para)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen)
