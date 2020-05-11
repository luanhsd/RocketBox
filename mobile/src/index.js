import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Routes from './routes'

const App = () => {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor="#263b97" barStyle="light-content" />
            <Routes />
        </NavigationContainer>
    );
};

export default App;
