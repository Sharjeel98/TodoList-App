import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { CreateTask, Home } from '../../screens';
const HomeStack = createStackNavigator()
const AppStack = createDrawerNavigator();

const HomeTab = ({ navigation }) => {
  return (
    <HomeStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="CreateTask" component={CreateTask} />
    </HomeStack.Navigator>
  )
}
const AppFlow = () => {
  return (
    <AppStack.Navigator initialRouteName="HomeTab" screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="HomeTab" component={HomeTab} />
    </AppStack.Navigator>
  );
};
export default AppFlow;

const styles = StyleSheet.create({});
