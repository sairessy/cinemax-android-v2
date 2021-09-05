import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Button, Checkbox, Searchbar } from 'react-native-paper';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Movie(props) {
  const addToFavorite = async (id) => {
    const favorites = await AsyncStorage.getItem('favoriteMovies');
    if (favorites == null) {
      await AsyncStorage.setItem('favoriteMovies', id + ',');
      console.log(await AsyncStorage.getItem('favoriteMovies'));
    } else {
      if (!favorites.split(',').includes(id)) {
        const favs = (await AsyncStorage.getItem('favoriteMovies')) + id + ',';
        await AsyncStorage.setItem('favoriteMovies', favs);
        console.log(await AsyncStorage.getItem('favoriteMovies'));
      }
    }
  }

  const init = async () => {
    await AsyncStorage.setItem('favoriteMovies', '');
  }

  useEffect(() => {
  }, []);

  return (
    <View style={{ backgroundColor: '#fff', width: '45%', borderWidth: 1, borderColor: '#f9f9f9', margin: 5, padding: 5, justifyContent: 'center', borderRadius: 5 }}>
      <TouchableOpacity
        onPress={() => {
          props.nav.navigate('Player', {
            id: props.id, videoUrl: props.videoUrl, title: props.title, description: props.description, isFav: props.isFav
          })
        }}
        style={{
          backgroundColor: '#f1f1f1',
          height: 150,
          borderRadius: 0,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Image style={{ height: 150, width: '100%' }} source={{ uri: props.img }} />
        <MaterialIcons name='play-circle-outline' size={100} color='#fff' style={{ position: 'absolute', margin: 'auto' }} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row' }}>
        <View>
          <MaterialIcons size={15} name={props.isFav ? 'favorite' : 'favorite-border'} color='#ff1155'
            style={{ padding: 5 }}
            onPress={() => addToFavorite(props.id)} />
          {/* <MaterialIcons size={15} name='history' color='#ff1155' style={{ padding: 5 }} /> */}
        </View>
        <Text style={{ fontFamily: 'Title-Font', padding: 5, color: '#666', height: 70 }}>{props.title.length < 24 ? props.title : props.title.substr(0, 24) + '...'}</Text>
      </View>
    </View >
  );
}