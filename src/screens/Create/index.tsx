import * as React from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'

import { RootState, RootAction } from '@/store'

type StateProps = {}

type DispatchProps = {}

type Props = StateProps & DispatchProps & NavigationScreenProps

type ScreenParams = {
  openLocationModal: () => void
}

class CreateScreen extends React.Component<Props> {
  static navigationOptions = ({
    navigation,
  }: NavigationScreenProps<ScreenParams>) => {
    const params = navigation.state.params || { openLocationModal: () => {} }

    return {
      headerTitle: <Text>Create customer</Text>,
      headerRight: (
        <Button
          onPress={params.openLocationModal}
          title="Find location"
          color="red"
        />
      ),
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({
      openLocationModal: this.openLocationModal,
    })
  }

  goBack = () => this.props.navigation.goBack()

  openLocationModal = () => {
    this.props.navigation.navigate('LocationModal')
  }

  render() {
    return (
      <View>
        <Text>Create</Text>
        <Button title="Go Back" onPress={this.goBack} />
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
)(CreateScreen)
