import React, { useState } from 'react';
import { View, Button, Text, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';
import { firebase } from '@/context/firebaseConfig';
import { useFirebase } from '@/context/firebaseContext';

export default function Categorize() {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const addCategory = () => {
    if (category) {
      setCategories([...categories, category]);
      setCategory('');
    }
  };

  const saveCategories = () => {
    const { user } = useFirebase();
    if (user) {
      firebase.firestore().collection('users').doc(user.uid).set({
        categories,
      }, { merge: true });
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter category"
        value={category}
        onChangeText={setCategory}
      />
      <Button title="Add Category" onPress={addCategory} />
      <FlatList
        data={categories}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Save Categories" onPress={saveCategories} />
    </View>
  );
}
