import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '@/context/firebaseConfig';

export default function Upload() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    const response = await fetch(image);
    console.log(response)
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(new Date().toISOString());
    const snapshot = await ref.put(blob);
    const url = await snapshot.ref.getDownloadURL();
    console.log('Uploaded a blob or file:', url);
  };

  return (
    <View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
}
