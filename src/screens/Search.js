import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, ScrollView, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Button, Checkbox, Searchbar } from 'react-native-paper';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import Movie from '../components/Movie';
import apiMovies from '../data/movies';
import Logo from '../components/Logo';

export default function Search({ navigation }) {

  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState([]);
  const [limit, setLimit] = useState(10);

  const searchMovie = async (text) => {
    let sMovies = [];
    setSearchText(text);

    if (searchText != '') {
      apiMovies.forEach(movie => {
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
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
                // return <Movie key={movie.id} id={movie.id} title={movie.title} img={movie.img} videoUrl={movie.url} description={movie.description} nav={navigation} />
                return <TouchableOpacity style={{ padding: 10 }} key={movie.id}
                  onPress={() => { navigation.navigate('Player', { id: movie.id, videoUrl: movie.videoUrl, title: movie.title, description: movie.description }) }}
                >
                  <Text style={{ fontFamily: 'Title-Font' }}>{movie.title}</Text>
                </TouchableOpacity>
              }) : <View></View>
          }
        </View>
      </ScrollView>
    </View >
  );
}