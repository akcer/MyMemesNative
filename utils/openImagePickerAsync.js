import * as ImagePicker from 'expo-image-picker';

let openImagePickerAsync = async () => {
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert('Permission to access camera roll is required!');
    return;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
  });

  if (pickerResult.cancelled === true) {
    return;
  }

  return pickerResult;
};

export default openImagePickerAsync;
