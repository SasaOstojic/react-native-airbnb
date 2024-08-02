import { View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/defaultStyles';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker' 

const Page = () => {
    const {isSignedIn, signOut} = useAuth();
    const {user} = useUser();
    console.log(user)
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setFLastName] = useState(user?.lastName);
    const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
    const [edit,setEdit] = useState(false);

    const onSaveUser = async () => {
        try{
          if(!firstName || !lastName) return;
          await user?.update({
            firstName,
            lastName
          })

        }catch(err){
          console.log(err)
        }
        finally{
          setEdit(false);
        }

      }
    

    const onCaptureImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality:0.75,
        base64:true
      })

      if(!result.canceled){
        const base64 = `data:image/png;base64, ${result.assets[0].base64}`;
        user?.setProfileImage({
          file: base64
        })
      }
    }

    useEffect(() => {
      if(!user) return;
      setFirstName(user.firstName);
      setFLastName(user.lastName);
      setEmail(user.emailAddresses[0].emailAddress);
    },[user])


  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        <Ionicons name='notifications-outline' size={26}/>
      </View>

      {user && (
        <View style={styles.card}>
            <TouchableOpacity onPress={onCaptureImage}>
              <Image source={{uri:user?.imageUrl}} style={styles.avatar}/>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', gap:6}}>
              {edit ? (
                <View style={styles.editRow}>
                  <TextInput
                   placeholder='First Name'
                   value={firstName || ''}
                   onChangeText={setFirstName}
                  style={[defaultStyles.inputField, {width: 100}]}
                   />
                   <TextInput
                   placeholder='Last Name'
                   value={lastName || ''}
                   onChangeText={setFLastName}
                  style={[defaultStyles.inputField, {width: 100}]}
                   />
                  <TouchableOpacity onPress={()=>onSaveUser()}>
                      <Ionicons color={Colors.dark} name='checkmark-outline' size={24}/>
                    </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.editRow}>
                  <Text style={{fontSize:19, fontFamily: 'mon-sb'}}>{firstName} {lastName}</Text>
                  <TouchableOpacity onPress={()=>setEdit(true)}>
                    <Ionicons color={Colors.dark} name='create-outline' size={24}/>
                  </TouchableOpacity>
                </View>
              )}
              
            </View>
            <Text>{email}</Text>
              <Text>{user?.createdAt?.toLocaleDateString()}</Text>
        </View>
      )}


        {isSignedIn && <Button title='Log out' onPress={()=> signOut()} color={Colors.dark}/> }
        {!isSignedIn && (
            <Link href={'/(modals)/login'} asChild>
                <Button title='Log In' color={Colors.dark}/>
            </Link>
        )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
    padding: 24
  },
  header: {
    fontFamily: 'mon-sb',
    fontSize: 24,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  editRow: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
})

export default Page;