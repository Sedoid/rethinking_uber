import { StyleSheet, Text, View, SafeAreaView, Image} from 'react-native'
import React from 'react'
import tw from "tailwind-react-native-classnames"
import NavOptions from '../components/NavOptions'
import { GOOGLE_MAPS_APIKEY } from "@env"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { TextInput } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin,  } from '../slices/navSlice'
import Geolocation from 'react-native-geolocation-service'
import NavFavourites from '../components/NavFavourites'

const HomeScreen = () => {

  // navigator.geolocation = require("@react-native-community/geolocation")
  // navigator.geolocation = require("react-native-geolocation-service")

  const dispatch = useDispatch()

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
            <Image 
            style = {{
                width: 100,
                height:100,
                resizeMode: "contain"
            }}
                source={{
                    uri: "https://links.papareact.com/gzs",
                }}
            />

            <GooglePlacesAutocomplete 
              styles={{  
                
                container:{
                  flex: 0,
                },

                TextInput:{
                  fontSize: 18
                }
                
                }}

              enablePoweredByContainer = {false}

              currentLocation={true}
              currentLocationLabel = 'Current Location'
              minLength = {2}
              returnKeyType = {"search"}

              query={{
                key: GOOGLE_MAPS_APIKEY,
                language: 'en',
                // components: 'country:cmr',
              }}
              fetchDetails = {true}
              onPress = {(data,details = null)=>{

                dispatch(
                  setOrigin({
                  location: details.geometry.location,
                  description: data.description
                })
                )

                dispatch(setDestination(null))
              }
              }
              nearbyPlacesAPI='GooglePlacesSearch'
              debounce={400}
              placeholder = "Where From"
            />

            <NavOptions />

            <NavFavourites />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        color: "red"
    }
})