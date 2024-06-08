import { Image, StyleSheet, Platform, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, router } from 'expo-router';
import { Button } from 'react-native-paper';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <ThemedText>Home Screen</ThemedText>
      <Button onPress={() => router.push('upload')}>
        <ThemedText>Upload Clothes</ThemedText>
      </Button>
      <Button onPress={() => router.push('categorize')}>
        <ThemedText>Catagorize Clothes</ThemedText>
      </Button>
      <Button onPress={() => router.push('suggestions')}>
        <ThemedText>Outfit Suggestions</ThemedText>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
