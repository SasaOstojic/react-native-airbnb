import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'
import React, {useState} from 'react'
import { BlurView } from 'expo-blur'
import Animated, { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated'
import { defaultStyles } from '@/constants/defaultStyles'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import {places} from '@/assets/data/places'
import DatePicker from 'react-native-modern-datepicker'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const guestsGroups = [
  {
    name: 'Adults',
    text: 'Ages 13 or above',
    count: 0,
  },
  {
    name: 'Children',
    text: 'Ages 2-12',
    count: 0,
  },
  {
    name: 'Infants',
    text: 'Under 2',
    count: 0,
  },
  {
    name: 'Pets',
    text: 'Pets allowed',
    count: 0,
  },
];

const Booking = () => {
  const router = useRouter();
  const [openCard,setOpenCard] = useState(0);
  const [selectedPlace,setSelectedPlace] = useState(0);
  const [groups, setGroups] = useState(guestsGroups);
  const today = new Date().toISOString().substring(0,10);

  const onClearAll = () => {
    setOpenCard(0);
    setSelectedPlace(0);
    setGroups(guestsGroups);
  }
  return (
    <BlurView intensity={70} tint='light' style={styles.container}>
      <View style={styles.card}>
      {
        openCard != 0 && (
          <AnimatedTouchableOpacity
           onPress={() => setOpenCard(0)}
            style={styles.cardPreview}
             entering={FadeIn.duration(200)}
             exiting={FadeOut.duration(200)}
             >
            <Text style={styles.previewText}>Where</Text>
            <Text style={styles.previewdData}>Im flexible</Text>
          </AnimatedTouchableOpacity>
        )
      }

      {openCard === 0 && (
        <>
          <Animated.Text style={styles.cardHeader}>Where to?</Animated.Text>
          <Animated.View style={styles.cardBody}>
            <View style={styles.searchSection}>
              <Ionicons name='search' size={20} style={styles.searchIcon}/>
              <TextInput placeholder='Search destination' style={styles.inputField} placeholderTextColor={Colors.grey} />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {places.map((item,index) => (
                <TouchableOpacity key={index} onPress={() => setSelectedPlace(index)}>
                    <Image source={item.img} style={selectedPlace === index ? styles.placeSelected : styles.place}/>
                    <Text style={{padding: 6, fontFamily: 'mon'}}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        
        </>
        
      )}

      </View>


      <View style={styles.card}>
      {
        openCard != 1 && (
          <AnimatedTouchableOpacity 
          onPress={() => setOpenCard(1)}
           style={styles.cardPreview}
           entering={FadeIn.duration(200)}
             exiting={FadeOut.duration(200)}
           >
            <Text style={styles.previewText}>Who</Text>
            <Text style={styles.previewdData}>Add guests</Text>
          </AnimatedTouchableOpacity>
        )
      }

    {openCard === 1 && (
      <>
        <Animated.Text entering={FadeIn} style={styles.cardHeader}>When is your trip?</Animated.Text>
        <Animated.View style={styles.card}>
          <DatePicker current={today} selected={today} options={{
            defaultFont: 'mon',
            headerFont:'mon-sb',
            borderColor: 'transparent',
            mainColor: Colors.primary
          }}/>
        </Animated.View>
      </>
        
      )}

      </View>

      <View style={styles.card}>
      {
        openCard != 2 && (
          <AnimatedTouchableOpacity
           onPress={() => setOpenCard(2)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
             exiting={FadeOut.duration(200)}
            >
            <Text style={styles.previewText}>Where</Text>
            <Text style={styles.previewdData}>Im flexible</Text>
          </AnimatedTouchableOpacity>
        )
      }

      {openCard === 2 && (
        <>
          <Animated.Text entering={FadeIn} style={styles.cardHeader}>Who is coming?</Animated.Text>
          <Animated.View style={styles.cardBody}>
            {groups.map((item,index) => (
              <View key={index} style={styles.guestItem}>
                <View>
                  <Text>{item.name}</Text>
                  <Text>{item.text}</Text>
                </View>

                <View style={{flexDirection:'row', gap: 10, alignItems:'center'}}>
                  <TouchableOpacity onPress={() => {
                    const newGroups = [...groups];
                    newGroups[index].count = newGroups[index].count > 0 ? newGroups[index].count  -1 : 0;
                    setGroups(newGroups);
                  }}>
                    <Ionicons name='remove-circle-outline' size={22} color={groups[index].count > 0 ? Colors.grey : '#cdcdcd'}/>
                      
                  </TouchableOpacity>
                  <Text style={{
                        fontFamily: 'mon ',
                        fontSize:16,
                        textAlign:'center',
                        minWidth:16
                      }}>{item.count}
                      </Text>
                  <TouchableOpacity onPress={() => {
                    const newGroups = [...groups];
                    newGroups[index].count++;
                    setGroups(newGroups) ;
                  }}>
                    <Ionicons name='add-circle-outline' size={22} color={  Colors.grey }/>
                     
                  </TouchableOpacity>
                </View>
              </View>
            )) }
          </Animated.View>
        </>
      )}

      </View>
      
      {/**FOOTER */}
      <Animated.View entering={SlideInDown.delay(200)} style={defaultStyles.footer}>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <TouchableOpacity onPress={onClearAll} style={{justifyContent: 'center'}}>
            <Text style={{fontSize:18, fontFamily: 'mon-sb', textDecorationLine: 'underline'}}>Clear all</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()} style={[defaultStyles.btn, {paddingLeft:50, paddingRight: 20}]}>
            <Ionicons name='search-outline' color='#fff' size={23} style={[defaultStyles.btnIcon]}/>
            <Text style={defaultStyles.btnText}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 20,
  },
  cardHeader: {
    fontFamily: 'mon-b',
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },

  searchSection: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ABABAB',
    borderRadius: 8,
    marginBottom: 16,
  },
  searchIcon: {
    padding: 10,
  },
  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  placesContainer: {
    flexDirection: 'row',
    gap: 25,
  },
  place: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  placeSelected: {
    borderColor: Colors.grey,
    borderWidth: 2,
    borderRadius: 10,
    width: 100,
    height: 100,
  },
  previewText: {
    fontFamily: 'mon-sb',
    fontSize: 14,
    color: Colors.grey,
  },
  previewdData: {
    fontFamily: 'mon-sb',
    fontSize: 14,
    color: Colors.dark,
  },

  guestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey,
  },
});

export default Booking