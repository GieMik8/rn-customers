import * as React from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'

import { RootState, RootAction } from '@/store'
import { getCustomers } from '@/modules/customers/selectors'

type StateProps = {}

type DispatchProps = {}

type Props = StateProps & DispatchProps & NavigationScreenProps

class LocationModal extends React.Component<Props> {
  goBack = () => this.props.navigation.goBack()

  render() {
    return (
      <View>
        <Text>Close modal</Text>
        <Button title="Close modal" onPress={this.goBack} />
      </View>
    )
  }
}

const mapStateToProps = (state: RootState): StateProps => ({})

const mapDispatchToProps = (
  dispatch: React.Dispatch<RootAction>
): DispatchProps => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationModal)
