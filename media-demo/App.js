import { StyleSheet, Button, View, Image } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { useState } from 'react';

export default function App() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        setImage(result.assets[0]);
      } else setImage(null);
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
        onPress={() => {}}
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
