import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import styles from './styles';
import logo from '../../assets/logo.png'

const Main = ({ navigation }) => {
    const [title, setTitle] = useState('')

    const handleSignIn = async () => {
        const response = await api.post(`boxes`, {
            title
        })

        await AsyncStorage.setItem('@RocketBox:box', response.data._id)
        navigation.navigate('Box')
    }

    useEffect(() => {
        const box = AsyncStorage.getItem('@RocketBox:box')
        if (box) {
            navigation.navigate('Box')
        }
    }, [])

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <TextInput
                style={styles.input}
                placeholder="Crie um box"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                value={title}
                onChangeText={text => setTitle(text)}
                underlineColorAndroid="transparent"
            />
            <TouchableOpacity onPress={handleSignIn}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Criar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Main;