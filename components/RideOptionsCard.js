import { StyleSheet, Text, View, Image,Alert, TouchableOpacity  } from 'react-native'
import React, {useState} from 'react'
import tw from 'tailwind-react-native-classnames'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { selectTravelTImeInformation } from '../slices/navSlice'
import "intl"
import "intl/locale-data/jsonp/en";
const data = [
    {
        id: "Uber-X-123",
        title: "Uberx",
        multiplier: 1,
        image: "https://links.papareact.com/3pn"
    },
    {
        id: "Uber-XL-456",
        title: "Uber-XL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8"        
    },
    {
        id: "Uber-LUX-789",
        title: "Uber-LUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf"        
    }

]

const SURGE_CHARGE_RATE = 19

const RideOptionsCard = () => {
    const navigation = useNavigation()
    const [selected,setSelected] = useState(null)
    const travelTimeInformation = useSelector(selectTravelTImeInformation)
  return (
    <SafeAreaView>
        <View>
            {/* <TouchableOpacity 
                onPress={() => Alert.alert("Testing","Clicked")} 
                
            >
                <Icon name='chevron-left' type='fontawesome' />
            </TouchableOpacity> */}
            <TouchableOpacity
                onPress={() => navigation.navigate("NavigateCard")}
                style={[tw`absolute top-3 left-5 p-3 rounded-full`,{zIndex: 99 }]}
            >
            <Icon name='chevron-left' type='fontawesome' />
            </TouchableOpacity>
            <Text style={tw`text-center py-4 text-xl`}>Select a Ride - {travelTimeInformation?.distance.text}</Text>
        </View>

        <FlatList
            data = {data}
            keyExtractor = {(item) => item.id}
            renderItem ={({item:{image,title,multiplier,id},item}) =>(
                
                <TouchableOpacity 
                    onPress={() => setSelected(item)} 
                    style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && "bg-gray-200"}`}
                    
                >
                    <Image

                        source={{
                            uri: image
                        }}

                        style={{
                            width: 100,
                            height: 100,
                            resizeMode:"contain"
                        }}
                    />
                    <View style={tw`-ml-6`}>
                        <Text style={tw`text-xl font-semibold`}>{title}</Text>
                        <Text>{travelTimeInformation?.duration.text} Travel Time</Text>
                        
                    </View>
                    <Text style={[tw`text-xl`,{
                        fontSize: 16,
                    }]}>
                        {
                            new Intl.NumberFormat('en-cmr',{
                                style:'currency',
                                currency: 'XAF'
                            }).format(
                                (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier)/100
                            )
                        }
                    </Text>
                </TouchableOpacity>
            )}
        />

        <View style={tw`mt-auto border-t border-gray-200`}>
            <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}>
                <Text style={tw`text-center text-white text-xl`}>
                    Choose {selected?.title}
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})