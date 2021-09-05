import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import * as Font from 'expo-font';

// Screens
import Player from './src/screens/Player';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import Loading from './src/screens/Loading';
import CheckUpdate from './src/screens/CheckUpdate'
import About from './src/screens/About';
import Favorite from './src/screens/Favorite';


// Navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Home Drawer Navigator
function DrawerHomee() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Favorite" component={Favorite} />
    </Drawer.Navigator>
  );
}

// The App
export default function App() {

  const loadFonts = async () => {
    await Font.loadAsync({
      "Title-Font": require('./assets/fonts/Montserrat-Medium.ttf'),
      "Main-Font": require('./assets/fonts/Roboto-Regular.ttf')
    });
  }

  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName='Home'
        screenOptions={{
          headerShown: false
        }}
        mode='card'
      >
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Player" component={Player} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="CheckUpdate" component={CheckUpdate} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Favorite" component={Favorite} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}