import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import Listings from './Listings'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

interface Props {
    listings: any,
    category: string,
    
}

const ListingsBottomSheet = ({listings, category}:Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['10%', '90%'],[]);
    const [refresh, setRefresh] = useState(0);

    const showMap = () => {
        bottomSheetRef.current?.collapse();
        setRefresh(refresh + 1);
    }

    
  return (
    <BottomSheet
     ref={bottomSheetRef}
     index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleIndicatorStyle={{backgroundColor: Colors.grey}}
      style={styles.sheetContainer}
      >
        <View style={{flex:1}}>
            <Listings listings={listings} category={category} refresh={refresh}/>
            <View style={styles.absoluteView}>
                <TouchableOpacity onPress={showMap} style={styles.btn}>
                    <Text style={{fontFamily: 'mon-sb', color:'#fff'}}>Map</Text>
                    <Ionicons size={22} name='map' color='#fff'/>
                </TouchableOpacity>
            </View>
        </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
    },
    absoluteView: {
      position: 'absolute',
      bottom: 30,
      width: '100%',
      alignItems: 'center',
    },
    btn: {
      backgroundColor: Colors.dark,
      padding: 14,
      height: 50,
      borderRadius: 30,
      flexDirection: 'row',
      marginHorizontal: 'auto',
      alignItems: 'center',
    },
    sheetContainer: {
      backgroundColor: '#fff',
      elevation: 4,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 4,
      shadowOffset: {
        width: 1,
        height: 1,
      },
    },
  });

export default ListingsBottomSheet