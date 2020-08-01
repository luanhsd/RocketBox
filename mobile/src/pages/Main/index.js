import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles';
import logo from '../../assets/logo.png';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

const Main = ({navigation}) => {
  const [box, setBox] = useState('');

  handleSignIn = async () => {
    const response = await api.post('boxes', {
      title: box,
    });

    await AsyncStorage.setItem('@RocketBox:box', response.data._id);

    navigation.navigate('Box');
  };

  useEffect(() => {
    verifyBox();
  }, []);

  async function verifyBox() {
    const box = await AsyncStorage.getItem('@RocketBox:box');
    if (box) {
      navigation.navigate('Box');
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <TextInput
        style={styles.input}
        placeholder="Crie um box"
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        value={box}
        onChangeText={(text) => setBox(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Criar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;
