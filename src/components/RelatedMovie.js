import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Button, Checkbox, Searchbar } from 'react-native-paper';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import apiMovies from '../data/movies';

export default function RelatedMovie(props) {

  useEffect(() => {
  }, []);

  return (
    <View style={{ backgroundColor: '#ffffff', width: 160, borderWidth: 1, borderColor: '#f9f9f9', padding: 5, justifyContent: 'center', borderRadius: 5 }}>
      <TouchableOpacity
        onPress={() => { console.log(props.id) }}
        style={{
          backgroundColor: '#f1f1f1',
          height: 150,
          borderRadius: 0,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Image style={{ height: 150, width: '100%' }} source={{ uri: apiMovies[props.id].img }} />
        <MaterialIcons name='play-circle-outline' size={100} color='#fff' style={{ position: 'absolute', margin: 'auto' }} />
      </TouchableOpacity>
      <View style={{
        flexDirection: 'row', backgroundColor: '#ff1155', height: 50
      }}>
        <View>
          {/* <MaterialIcons size={15} name='star-border' color='#ff1155' style={{ padding: 5 }} /> */}
          {/* <MaterialIcons size={15} name='history' color='#ff1155' style={{ padding: 5 }} /> */}
        </View>
        <Text style={{ fontFamily: 'Title-Font', padding: 5, color: '#fff' }}>{apiMovies[props.id].title}</Text>
      </View>
    </View >
  );
}