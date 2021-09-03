import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Button, Checkbox, Searchbar } from 'react-native-paper';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Video, AVPlaybackStatus } from 'expo-av';

import RelatedMovie from '../components/RelatedMovie';


export default function Home({ route, navigation }) {
  const video = useRef(null);
  const [videoStatus, setVideoStatus] = useState({});

  useEffect(() => {

  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 0.8 }}>
        <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <Video
            ref={video}
            style={{ width: '100%', height: 150 }}
            source={{
              uri: 'http://cinetop.co.mz/storage/film/Black.Panther.2018.720p.BluRay.x264-[YTS.AM-muxed.mp4'
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={status => setVideoStatus(() => status)}
          />
          <Button loading={true} icon='play'
            labelStyle={{ color: '#ff1155' }}
            style={{ position: 'absolute', margin: 'auto', display: 'none' }}
          >
            Carregando
          </Button>
          <Button icon='arrow-left'
            labelStyle={{ color: '#fff', textTransform: 'capitalize', color: '#ff1155' }}
            style={{ position: 'absolute', top: 0, left: 0, margin: 10 }}
            onPress={() => { navigation.goBack() }}
          >
            Voltar
          </Button>
          <MaterialIcons size={25} name='more-vert' color='#ff1155' style={{ margin: 10, marginTop: 15, position: 'absolute', top: 0, right: 0 }} />
          <MaterialIcons size={25} name='search' color='#ff1155'
            onPress={() => navigation.navigate('Search')}
            style={{ margin: 10, marginRight: 50, marginTop: 15, position: 'absolute', top: 0, right: 0 }} />
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
          <MaterialIcons size={25} name='favorite-border' color='#ff1155' style={{ margin: 5 }} />
          <Text style={{ fontFamily: 'Title-Font', fontSize: 16, margin: 5 }}>{route.params.title}</Text>
        </View>
        <Text style={{ fontFamily: 'Title-Font', fontSize: 14, color: 333, padding: 5 }}>{route.params.description.trim()}</Text>
        <Text style={{ fontFamily: 'Title-Font', fontSize: 16, margin: 5 }}>Relacionados</Text>
        <View style={{ backgroundColor: '#fcfcfc', padding: 10 }}>
          <SafeAreaView>
            <FlatList
              data={[1601, 1609, 1620, 1522, 1606]}
              horizontal
              keyExtractor={item => item.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <RelatedMovie key={item} id={item} />
                )
              }}
            >
            </FlatList>
          </SafeAreaView>
        </View>
      </ScrollView>
    </View>
  );
}