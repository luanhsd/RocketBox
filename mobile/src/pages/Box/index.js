import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api'
import styles from './styles';

const Box = () => {
    const [box, setBox] = useState({
        _id: '',
        title: '',
        createdAt: '',
        files: [],
        updatedAt: '',
    })


    useEffect(async () => {
        const id = await AsyncStorage.getItem('@RocketBox:box')
        api.get(`boxes/${id}`)
            .then(response => {
                setBox(response.data)
            })
    }, [])


    return (
        <View style={styles.container}>
            <Text style={styles.boxTitle}>{box.title}</Text>
        </View>
    )
}

export default Box;