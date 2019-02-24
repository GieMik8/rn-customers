import * as React from 'react'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'
import { Button, Text, View, Content } from 'native-base'

import { RootState, RootAction } from '@/store'
import { AddressForm } from '@/containers'
import { Address } from '@/types'

type StateProps = {
  // address: Address
}

type DispatchProps = {}

type Props = StateProps &
  DispatchProps &
  NavigationScreenProps<{
    address: Address
    onSubmitAddress: (address: Address) => void
  }>

type State = {
  address: Address
}

class LocationModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    console.log(props.navigation)
    const initialAddress = props.navigation.getParam('address') || new Address()
    this.state = {
      address: initialAddress,
    }
  }

  goBack = () => this.props.navigation.goBack()

  submit = (address: Address) => {
    console.log({ address }, this.props.navigation.getParam('onSubmitAddress'))
    this.props.navigation.getParam('onSubmitAddress')(address)
    this.props.navigation.goBack()
  }

  render() {
    return (
      <Content>
        <View>
          <Button onPress={this.goBack}>
            <Text>Close modal</Text>
          </Button>
        </View>
        <AddressForm address={this.state.address} onSubmit={this.submit} />
      </Content>
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
