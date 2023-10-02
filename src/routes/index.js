import { StatusBar, } from 'react-native';
import React, { createRef, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AppFlow from './AppFlow';
import { persistor, store, } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { MenuProvider } from 'react-native-popup-menu';
import notifee from "@notifee/react-native"
const navigationRef = createRef(navigationRef);
const AllStack = createStackNavigator();

const App = () => {

  return (
    <MenuProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer ref={navigationRef}>
            <StatusBar barStyle={'dark-content'} backgroundColor={"#fff"} />
            <AllStack.Navigator screenOptions={{ headerShown: false }}>
              <AllStack.Screen name="App" component={AppFlow} />
            </AllStack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </MenuProvider>
  );
};
export { App, navigationRef };

