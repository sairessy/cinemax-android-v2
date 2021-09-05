import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function Loading({ navigation }) {

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View
        style={{
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          height: 50
        }}>
        <MaterialIcons name='arrow-back' size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={{ fontSize: 22, marginLeft: 5 }}>Voltar</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>

      </ScrollView>
    </View>
  );
}