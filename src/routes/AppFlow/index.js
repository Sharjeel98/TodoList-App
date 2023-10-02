import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { CreateTask, Home } from '../../screens';
import { useDispatch } from 'react-redux';
import { setCategories, setTasks } from '../../redux/user';
import AppLoader from '../../components/AppLoader';
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



const AppFlow = ({ navigation }) => {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(setTasks([]))
  //   dispatch(setCategories([]))
  // }, [])
  return (
    <>
      <AppLoader />
      <AppStack.Navigator screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#fff',
        drawerStyle: {
          backgroundColor: '#343434',
        },
      }}
        initialRouteName="HomeTab">
        <AppStack.Screen options={{ drawerLabel: "Home" }} name="HomeTab" component={HomeTab} />
      </AppStack.Navigator>
    </>

  );
};
export default AppFlow;

const styles = StyleSheet.create({});
