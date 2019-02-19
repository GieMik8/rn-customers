import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Root } from 'native-base'

import AppContainer from '@/navigation'
import { store } from '@/store'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <AppContainer />
        </Root>
      </Provider>
    )
  }
}
