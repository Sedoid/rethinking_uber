import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Map from '../components/Map'
import tw from 'tailwind-react-native-classnames'
import { createStackNavigator } from '@react-navigation/stack'
import NavigateCard from '../components/NavigateCard'
import RideOptionsCard from '../components/RideOptionsCard'
import { Touchable } from 'react-native'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'

const MapScreen = () => {

  const Stack = createStackNavigator();
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity  
        style={tw`absolute top-16 left-8 z-50 p-3 rounded-full bg-white shadow-lg`}
        onPress = {() => navigation.navigate("HomeScreen")}
      >
        <Icon name='menu'  />
      </TouchableOpacity>

      <View style={tw`h-1/2`}>
          <Map />   
      </View>

      <View  style={tw`h-1/2`}>
          <Stack.Navigator>
              <Stack.Screen name = "NavigateCard" component={NavigateCard} options={{headerShown: false}} />
              <Stack.Screen name = "RideOptionsCard" component={RideOptionsCard} options={{headerShown: false}} />
          </Stack.Navigator>
      </View>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({})