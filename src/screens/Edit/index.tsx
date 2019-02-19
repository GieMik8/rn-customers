import * as React from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'

import { RootState, RootAction } from '@/store'

type StateProps = {}

type DispatchProps = {}

type Props = StateProps & DispatchProps & NavigationScreenProps

class EditScreen extends React.Component<Props> {
  goBack = () => this.props.navigation.goBack()

  componentDidMount() {
    const { params } = this.props.navigation.state
    if (!params) return console.log('OMG')
    console.log('edit', params.id)
  }

  render() {
    return (
      <View>
        <Text>Edit Customer</Text>
        <Button title="Go To Customers" onPress={this.goBack} />
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
)(EditScreen)
