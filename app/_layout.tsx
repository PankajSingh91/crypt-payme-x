import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Root Home Page */}
        <Stack.Screen
          name="index"
          options={{ title: 'Welcome', headerShown: false }}
        />

        {/* Wallet Connect Page */}
        <Stack.Screen
          name="wallet"
          options={{ title: 'Connect Wallet' }}
        />

        {/* Dashboard Page */}
        <Stack.Screen
          name="dashboard"
          options={{ title: 'Dashboard' }}
        />

        {/* Tabs (if you add tabbed navigation later) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* 404 fallback */}
        <Stack.Screen name="+not-found" />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
