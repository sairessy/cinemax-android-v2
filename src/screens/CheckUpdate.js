import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import Constants from 'expo-constants';

export default function Loading({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [downloadLink, setDownloadLink] = useState('');
  const [lastVersion, setLastVersion] = useState(false);

  const loadData = async () => {
    let downLink = '';
    let lVersion = false;
    let lded = false;

    try {
      const response = await fetch('http://cinemax-backend.glitch.me/appconfig');
      if (response.status == 'OK') {
        const data = response.json();
        downLink = data.downloadLink;
        lVersion = data.lastVersion == getAppVersion();
        lded = true;
      }
    } catch (err) {
      console.error(err);
      setLoaded(lded);
      setLoading(false);
      setDownloadLink(downLink);
      setLastVersion(lVersion);
    }
  }

  const getAppVersion = async () => {
    return Constants.manifest.version;
  }

  const openDownloadLink = async () => {
    console.log(downloadLink);
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View
        style={{
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'center',
          height: 50
        }}>
        <Button icon='arrow-left' labelStyle={{ color: '#000', textTransform: 'capitalize' }} onPress={() => navigation.goBack()}>Voltar</Button>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator style={{ display: loading ? 'flex' : 'none' }} />
        <View style={{ display: !loading && !loaded ? 'flex' : 'none' }}>
          <Text>Conecte-se à internet para verificar actualizações!</Text>
        </View>
        <View style={{ display: !loading && lastVersion ? 'flex' : 'none' }}>
          <Text>Está usar a última versão do Cinemax!</Text>
        </View>
        <View style={{ display: !loading && loaded && !lastVersion ? 'flex' : 'none' }}>
          <Text>Há uma nova actualização disponível!</Text>
          <Button mode='contained' labelStyle={{ color: '#fff' }} style={{ backgroundColor: '#2bccb1' }}
            onPress={() => openDownloadLink()}
          >
            Baixar
          </Button>
        </View>
      </View>
    </View>
  )
}