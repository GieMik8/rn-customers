import React, { Component } from 'react'
import { Provider } from 'react-redux'

import AppContainer from '@/navigation'
import { store } from '@/store'

interface Props {}
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
