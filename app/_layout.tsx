import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { FirebaseProvider, useFirebase } from '@/context/firebaseContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const { user } = useFirebase();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if ( !user ) {
      router.replace('sign-in');
    } else {
      router.replace('(tabs)')
    }
  })

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name='sign-in' />
          <Stack.Screen name='sign-up' />
          <Stack.Screen name='forgot-password' />
          <Stack.Screen name='upload' />
        </Stack>
      </ThemeProvider>
  )
}
export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <FirebaseProvider>
      <MainLayout />
    </FirebaseProvider>
  );
}
