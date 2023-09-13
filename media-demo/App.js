import { StyleSheet, Button, View, Image } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { useState } from 'react';

export default function App() {
  const [image, setImage] = useState(null);

  // get photo from library
  const pickImage = async () => {
    // request permission from user
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // get selected photo and set state
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        setImage(result.assets[0]);
      } else setImage(null);
    }
  }

  // take new photo
  const takePhoto = async () => {
    // get permission to access camera
    let permissions = await ImagePicker.getCameraPermissionsAsync();
    if (permissions?.granted) {
      // launch camera
      let result = await ImagePicker.launchCameraAsync();
      // add new photo to state
      if (!result.canceled) {
        setImage(result.assets[0]);
      } else {
        setImage(null);
      }
    }

  }

  return (
    <View style={styles.container}>
      <Button
        title="Pick an image from the library"
        onPress={pickImage}
      />
      <Button
        title="Take a photo"
        onPress={takePhoto}
      />
      {image &&
        <Image source={{uri: image.uri}} style={{ width: 200, height: 200 }}/> 
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
