import { createStackNavigator, createAppContainer } from 'react-navigation'

import { MainScreen, EditScreen } from '@/screens'

const appNavigator = createStackNavigator(
  {
    Main: MainScreen,
    Edit: EditScreen,
  },
  { initialRouteName: 'Main' }
)

export default createAppContainer(appNavigator)
