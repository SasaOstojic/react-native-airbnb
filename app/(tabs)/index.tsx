import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Link, Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import ListingData from '@/assets/data/airbnb-listings.json'
import ListingsMap from '@/components/ListingsMap';
import ListingDataGeo from '@/assets/data/airbnb-listings.geo.json'
import ListingsBottomSheet from '@/components/ListingsBottomSheet';

const Page = () => {
  const [category, setCategory] = useState('Tiny homes')
  const items = useMemo(() => ListingData as any, [] )
  const onDataChanged = (category: string) => {
    setCategory(category);
  }
  return (
    <View style={{flex: 1, marginBottom:0}}>
      <Stack.Screen options={{
        header: () => <ExploreHeader onCategoryChanged={onDataChanged}/>
      }}/>
      {/* <Listings category={category} listings={items}/> */}
      <ListingsMap listings={ListingDataGeo}/>
      <ListingsBottomSheet listings={items} category={category}/>
    </View>
  )
}

export default Page;