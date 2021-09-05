import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';

import Constants from 'expo-constants';

export default function Loading({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const loadData = async () => {
    let loadedSuccess = false;
    try {
      const response = await fetch('https://cinemax-backend.glitch.me/appconfig');
      if (response.status == 'OK') {
        const data = response.json();
        AsyncStorage.setItem({ 'movies': data.movies });
        loadedSuccess = true;
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
    setLoaded(loadedSuccess);
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', padding: 10, paddingTop: Constants.statusBarHeight }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ width: 60, height: 60 }} source={require('../../assets/icon.png')} />
        <ActivityIndicator style={{ display: loading ? 'flex' : 'none' }} />
      </View>
      <View style={{ display: !loading ? 'flex' : 'none' }}>
        <Text style={{ textAlign: 'center' }}>
          {loaded ? 'A lista de filmes foi actualizada com sucesso!' : 'Conecte-se à internet para actualizar a lista de filmes!'}
        </Text>
        <Button mode='contained' style={{ backgroundColor: '#111', marginTop: 10 }} labelStyle={{ color: '#fff', textTransform: 'capitalize' }}
          onPress={() => navigation.navigate('Home')}
        >
          Próximo
        </Button>
      </View>
    </View>
  )
}