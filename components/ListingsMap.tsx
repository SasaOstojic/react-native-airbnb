import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps'
import { defaultStyles } from '@/constants/defaultStyles';
import { useRouter } from 'expo-router';
import MapView from 'react-native-map-clustering';

interface Props {
    listings: any;
}

const INITIAL_REGION = {
    latitude: 37.33,
    longitude:-122,
    latitudeDelta:9,
    longitudeDelta:9
}

const ListingsMap = ({listings}: Props) => {
    const router = useRouter();
    const onMarkerSelected = (item:any) => {
        router.push(`/listing/${item.properties.id}`)
    }

    const renderCluster = (cluster:any) => {
        const {id, geometry,onPress,properties} = cluster;
        const points = properties.point_count;

        return (
            <Marker key={`cluster-${id}`} onPress={onPress} coordinate={{
                latitude:geometry.latitude,
                longitude:geometry.longitude,
            }}>
                <View style={styles.marker}>
                    <Text style={{color: '#fff', textAlign: 'center', fontFamily:'mon-sb'}}>{points}</Text>
                </View>
            </Marker>
        )
    }
  return (
    <View style={defaultStyles.container}>
    <MapView style={StyleSheet.absoluteFill}
     animationEnabled={false} 
     provider={PROVIDER_DEFAULT}
      showsUserLocation 
      showsMyLocationButton
       initialRegion={INITIAL_REGION}
        renderCluster={renderCluster}>
        {listings.features.map((item:any) => (
            <Marker key={item.properties.id} coordinate={{
                latitude:item.properties.latitude,
                longitude:item.properties.longitude,
            }}
            onPress={() => onMarkerSelected(item)}
            
            >
            <View style={styles.marker}>
                <Text style={styles.markerText}>$ {item.properties.price}</Text>
            </View>  
            </Marker>
        ))}
    </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    marker: {
      padding: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      elevation: 5,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: {
        width: 1,
        height: 10,
      },
    },
    markerText: {
      fontSize: 14,
      fontFamily: 'mon-sb',
    },
    locateBtn: {
      position: 'absolute',
      top: 70,
      right: 20,
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: {
        width: 1,
        height: 10,
      },
    },
  });
  

export default ListingsMap;