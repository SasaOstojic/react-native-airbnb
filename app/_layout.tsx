import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import ModalHeaderText from '@/components/ModalHeaderText';
import Colors from '@/constants/Colors';

const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string){
    try{
      return SecureStore.getItemAsync(key);
    }catch(err){
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
}


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'mon': require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
          <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
            <RootLayoutNav />
          </ClerkProvider>
          </GestureHandlerRootView>
  )
}

function RootLayoutNav() {
  const router = useRouter();
  const {isLoaded, isSignedIn} = useAuth();


  useEffect(() => {
    if(isLoaded && !isSignedIn){
      router.push('/(modals)/login');
    }
  },[isLoaded])
  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(modals)/login" options={
          { 
            presentation: 'modal',
             title: 'Log in or Sign up',
             headerTitleStyle: {
             fontFamily: 'mon-sb'
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()} >
                <Ionicons name='close-outline' size={28}/>
              </TouchableOpacity>
            )
          }
          } />
          <Stack.Screen name="listing/[id]" options={{
            headerTitle: '', headerTransparent:true
          }}/>
          <Stack.Screen name="(modals)/booking" options={{
            presentation: 'transparentModal',
            headerTransparent: true,
            animation: 'fade',
            headerTitle: () => <ModalHeaderText/>,
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()} style={{backgroundColor:'#fff', borderRadius:20,borderWidth:1,padding:4}} >
                <Ionicons name='close-outline' size={28} color={'#000'}/>
              </TouchableOpacity>
            )
          }}/>
      </Stack>
  );
}
