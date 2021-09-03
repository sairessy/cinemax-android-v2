import React from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import CONFIG from '../config';


export default function Logo() {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20, marginTop: 20 }}>
            <Image
                style={{ width: 30, height: 30, marginRight: 5 }}
                source={require('../../assets/icon.png')}
            />
            <Text style={{ fontSize: 28, fontFamily: 'Title-Font' }}>{CONFIG.title}</Text>
        </View>
    );
}