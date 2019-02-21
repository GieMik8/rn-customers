import { createStackNavigator, createAppContainer } from 'react-navigation'

import { CustomersScreen, EditScreen, CreateScreen } from '@/screens'
import { LocationModal } from '@/modals'

const mainStack = createStackNavigator(
  {
    Customers: {
      screen: CustomersScreen,
    },
    Edit: {
      screen: EditScreen,
    },
    Create: {
      screen: CreateScreen,
    },
  },
  {
    initialRouteName: 'Create',
    headerMode: 'none',
  }
)

const rootStack = createStackNavigator(
  {
    Main: {
      screen: mainStack,
    },
    LocationModal: {
      screen: LocationModal,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

export default createAppContainer(rootStack)
