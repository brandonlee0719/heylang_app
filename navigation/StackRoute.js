import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from '../screens/SignUp';
import SignInScreen from '../screens/SignIn';
import {theme} from '../styles/styles';
import * as React from 'react';

const Stack = createNativeStackNavigator();

const StackRoute = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SignUp"
      component={SignUpScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{
        title: '',
        headerStyle: {
          backgroundColor: theme.colors.background,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: theme.colors.headerTint,
      }}
    />
  </Stack.Navigator>
);
export default StackRoute;
