import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Main from '../pages/Main'
import Box from '../pages/Box'

const Stack = createStackNavigator()

function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
            <Stack.Screen name="Box" component={Box} options={{ headerShown: false }} />
        </Stack.Navigator >
    )
}

export default Routes