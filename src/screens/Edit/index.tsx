import * as React from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'

import { RootState, RootAction } from '@/store'
import { Customer } from '@/types'
import { getCustomers } from '@/modules/customers/selectors'

type StateProps = {
  customers: Customer[]
}

type DispatchProps = {}

type Props = StateProps & DispatchProps & NavigationScreenProps

class EditScreen extends React.Component<Props> {
  goToMain = () => this.props.navigation.navigate('Main')

  render() {
    return (
      <View>
        <Text>Edit Screen</Text>
        <Button title="Go To Main" onPress={this.goToMain} />
      </View>
    )
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  customers: getCustomers(state),
})

const mapDispatchToProps = (
  dispatch: React.Dispatch<RootAction>
): DispatchProps => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditScreen)
