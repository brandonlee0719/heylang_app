import CustomDrawer from '../components/Drawer';
import {theme} from '../styles/styles';
import HomeScreen from '../screens/Home';
import AccountSettings from '../screens/AccountSettings';
import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

const DrawerRoute = () => (
  <Drawer.Navigator drawerContent={CustomDrawer}>
    <Drawer.Screen
      options={{
        headerStyle: {backgroundColor: theme.colors.background},
        headerTintColor: theme.colors.primary,
        drawerLabelStyle: {
          ...theme.textVariants.h3,
          color: theme.colors.secondary,
        },
      }}
      name="Home"
      component={HomeScreen}
    />
    <Drawer.Screen
      options={{
        headerStyle: {backgroundColor: theme.colors.background},
        headerTintColor: theme.colors.primary,
        drawerLabelStyle: {
          ...theme.textVariants.h3,
          color: theme.colors.secondary,
        },
      }}
      name="Account Settings"
      component={AccountSettings}
    />
  </Drawer.Navigator>
);
export default DrawerRoute;
