import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { GOOGLE_MAPS_APIKEY } from "@env"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrigin, setDestination } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import NavFavourites from './NavFavourites'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

const NavigateCard = () => {

    console.log("*****"+GOOGLE_MAPS_APIKEY+"*****")

    const dispatch = useDispatch()
    const navigation = useNavigation()

    return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning, Dzekewong</Text>
      <View styles={tw`border-t border-gray-200 flex-shrink`}>    
            <View>

                <GooglePlacesAutocomplete 
                    placeholder='Where to?'
                    styles={textInputStyles}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    minLength={2}
                    onPress={(data,details = null) =>{

                        dispatch(setDestination({
                            location: details.geometry.location,
                            description: data.description
                        }))

                        navigation.navigate('RideOptionsCard')
                    }}
                    enablePoweredByContainer = {false}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: "en"
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}

                />
                      

            </View>
      </View>

      <NavFavourites />

      <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>

        <TouchableOpacity
            onPress={() => navigation.navigate("RideOptionsCard")}
            style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>
            <Icon name='car' type='font-awesome' color={'white'} size={16}/>
            <Text style={tw`text-white text-center`}>Ride</Text>
        </TouchableOpacity>

        <TouchableOpacity  style={tw`flex  justify-between flex-row bg-white w-24 px-4 py-3 rounded-full`}>
            <Icon name='fast-food-outline' type='ionicon' color={'black'} size={16}/>
            <Text style={tw`text-black text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  )
}

export default NavigateCard

const textInputStyles = StyleSheet.create({

    container:{
        backgroundColor: 'white',
        paddingTop: 20,
        flex: 0,
    },
    textInput:{
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18
    },
    textInputContainer:{
        paddingHorizontal: 20,
        paddingBottom: 0
    }
})