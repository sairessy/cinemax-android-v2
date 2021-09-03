import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as Font from 'expo-font';

// Screens
import Player from './src/screens/Player';
import Home from './src/screens/Home';
import Search from './src/screens/Search';

const Stack = createStackNavigator();

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
      <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          headerShown: false
        }}
        mode='card'
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Player" component={Player} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}