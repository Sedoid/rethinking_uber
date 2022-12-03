import { StyleSheet, Text, View } from 'react-native'
import React,{useRef, useEffect} from 'react'
import MapView,{Marker} from 'react-native-maps'
import tw from 'tailwind-react-native-classnames'
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_APIKEY } from "@env" 

const Map = () => {

    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
    const mapRef = useRef(null)
    const dispatch = useDispatch()
    
    useEffect(() => {

        if(!origin || !destination) return;

        // Zoom & fit to markers
        console.log("***** Inside the use effect *****")
        mapRef.current.fitToSuppliedMarkers(['origin','destination'],{
            edgePadding:{
                top:50,
                right:50,
                bottom:50,
                left: 50
            } 
        })
    }, [origin,destination])

    useEffect(() =>{

        if(!origin || !destination) return;
        

        const getTravelTime = () =>{
            const URL = fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
                        units=imperial&origins=${origin.description}&destinations=${destination.description}
                        &key=${GOOGLE_MAPS_APIKEY}`)
                        .then(res => res.json())
                        .then(data =>{
                            mapRef.current.fitToSuppliedMarkers(['origin','destination'],{
                                edgePadding:{
                                    top:50,
                                    right:50,
                                    bottom:50,
                                    left: 50
                                } 
                            })

                            dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
                        })
        }

        getTravelTime()
    },[origin,destination,GOOGLE_MAPS_APIKEY])



  return (

      <MapView
            ref = {mapRef}
            style ={tw`flex-1 w-full`}
            mapType = "standard"

            initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
            }}>

            {origin && destination && (<MapViewDirections 
                origin={origin.description}
                destination = {destination.description}
                apikey = {GOOGLE_MAPS_APIKEY}
                strokeColor = "black"
                strokeWidth={3}
            />)}

            {origin?.location && (
                <Marker 
                    title='Origin'
                    description={origin.description}
                    identifier = "origin"

                    coordinate={{
                        latitude : origin.location.lat,
                        longitude: origin.location.lng                   
                    }}
                />
            )}


            {destination?.location && (
                <Marker 
                    title='Destination'
                    description={destination.description}
                    identifier = "destination"

                    coordinate={{
                        latitude : destination.location.lat,
                        longitude: destination.location.lng                   
                    }}
                />
            )}

        </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})