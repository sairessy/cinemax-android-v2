import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Constants from 'expo-constants';

import apiMovies from '../data/movies';

export default function Search({ navigation }) {

  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    // const favs = (await AsyncStorage.getItem('favoriteMovies')).split('/');
    setFavorites([]);
  }

  const isFavorite = async (id) => {
    return favorites.includes(id);
  }

  const searchMovie = async (text) => {
    let sMovies = [];
    setSearchText(text);
    const storedMovies = await AsyncStorage.getItem('movies');
    let masterMovies = storedMovies == null ? apiMovies : storedMovies;

    if (searchText != '') {
      masterMovies.forEach(movie => {
        if (movie.title.toLowerCase().includes(searchText.toLowerCase())) {
          sMovies.push(movie);
        }
      });
      setMovies(sMovies);
    } else {
      setMovies([]);
    }
  }

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Constants.statusBarHeight }}>
      <View
        style={{
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          height: 50
        }}>
        <MaterialIcons name='arrow-back' size={30}
          onPress={() => { navigation.goBack() }}
        />
        <Searchbar placeholder='Pesquisar' autoFocus={true} value={searchText} onChangeText={(text) => { searchMovie(text) }}
          style={{ flex: 1, backgroundColor: '#fff', borderRadius: 4, padding: 0, height: 40, marginRight: 5 }}
        />
      </View>
      <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
        <View style={{ justifyContent: 'center' }}>
          {
            movies.length > 0 ?
              movies.map(movie => {
                return <TouchableOpacity style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }} key={movie.id}
                  onPress={() => {
                    navigation.navigate('Player', {
                      id: movie.id,
                      videoUrl: movie.url,
                      title: movie.title,
                      description: movie.description,
                      isFav: true
                    })
                  }}
                >
                  <MaterialIcons name='search' color='#ddd' size={20} />
                  <Text style={{ fontFamily: 'Title-Font', color: '#444', marginLeft: 5, fontSize: 12 }}>{movie.title}</Text>
                </TouchableOpacity>
              }) : <View></View>
          }
        </View>
      </ScrollView>
    </View >
  );
}