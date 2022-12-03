import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import {Icon} from "react-native-elements"
import tw from "tailwind-react-native-classnames"
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'


const data = [
    {
        id:"1",
        title: "Get a ride",
        image: "https://links.papareact.com/3pn",
        screen: "MapScreen"
    },
    {
        id:"2",
        title: "Order Food",
        image: "https://links.papareact.com/28w",
        screen: "EatsScreen"
    }
]


const NavOptions = () => {

    const origin = useSelector(selectOrigin)
    const navigation = useNavigation();


  return (
    <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
            <TouchableOpacity 
                onPress={() => navigation.navigate(item.screen)} 
                style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
                disabled = {!origin}
            >
                <View style={tw`${!origin && "opacity-20"}`}>
                    <Image 
                        style = {{
                            width: 120,
                            height: 120,
                            resizeMode: "contain"
                        }}
                        source = {{
                            uri : item.image
                        }}
                       
                    />
                     <Text style={tw`mt-2 text-lg font-semibold `}>{item.title}</Text>
                    <Icon 
                        type = "antdesign"
                        color = "white"
                        name = "arrowright"
                        style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                    />
                </View>
            </TouchableOpacity>
        )}
     />
  )
}

export default NavOptions

const styles = StyleSheet.create({})