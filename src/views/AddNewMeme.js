import React, { useState } from 'react';
import { Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, Input, Button, Image } from 'react-native-elements';
import axios from 'axios';
import Error from '../components/Error';
import openImagePickerAsync from '../../utils/openImagePickerAsync';
import Constants from 'expo-constants';

const AddNewMeme = ({ navigation }) => {
  const [topTitle, setTopTitle] = useState('');
  const [bottomTitle, setBottomTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [loading, isLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  const pickImage = () => {
    openImagePickerAsync()
      .then((pickerResult) => {
        setImage(pickerResult);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      });
  };
  const handleSubmit = () => {
    isLoading(true);
    const formData = new FormData();
    formData.append('imageFile', {
      uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
      type: 'image/jpg',
      name: image.uri.split(/[\\/]/).pop(), //get uri basename
    });
    formData.append('topTitle', topTitle);
    formData.append('bottomTitle', bottomTitle);
    formData.append('text', text);
    axios
      .post(`${Constants.manifest.extra.apiUrl}/memes/add`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        navigation.navigate('Meme', { id: response.data.response._id });
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      })
      .finally(() => {
        isLoading(false);
      });
  };

  return (
    <ScrollView>
      <Text h4 style={{ textAlign: 'center' }}>
        Add New Meme 
      </Text>
      <Input
        label="Top Title"
        placeholder="Top Title"
        leftIcon={<Icon name="angle-right" size={24} color="black" />}
        onChangeText={(text) => setTopTitle(text)}
        value={topTitle}
      />
      <Input
        label="Bottom Title"
        placeholder="Bottom Title"
        leftIcon={<Icon name="angle-right" size={24} color="black" />}
        onChangeText={(text) => setBottomTitle(text)}
        value={bottomTitle}
      />
      <Input
        label="Text"
        placeholder="Text"
        leftIcon={<Icon name="angle-right" size={24} color="black" />}
        onChangeText={(text) => setText(text)}
        value={text}
      />
      <Button title="Pick An Image" onPress={pickImage} />
      {isError && <Error error={error} />}
      <Button
        containerStyle={{ paddingTop: 20 }}
        title="Add Meme"
        onPress={handleSubmit}
        loading={loading}
      />
    </ScrollView>
  );
};

export default AddNewMeme;
