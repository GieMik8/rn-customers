import * as React from 'react'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'
import {
  Container,
  Header,
  Item,
  Icon,
  Button,
  Input,
  Text,
  View,
  Content,
} from 'native-base'

import { RootState, RootAction } from '@/store'

type StateProps = {}

type DispatchProps = {}

type Props = StateProps & DispatchProps & NavigationScreenProps

class LocationModal extends React.Component<Props> {
  goBack = () => this.props.navigation.goBack()

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon type="FontAwesome5" name="search-location" />
            <Input placeholder="Search" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content>
          <View>
            <Button onPress={this.goBack}>
              <Text>Close modal</Text>
            </Button>
          </View>
        </Content>
      </Container>
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
