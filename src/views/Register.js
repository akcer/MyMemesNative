import React, { useState, useEffect } from 'react';
import { Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import axios from 'axios';
import openImagePickerAsync from '../../utils/openImagePickerAsync';
import Error from '../components/Error';
import Constants from 'expo-constants';

const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, isLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  const pickImage = () => {
    openImagePickerAsync()
      .then((pickerResult) => {
        setAvatar(pickerResult);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      });
  };

  const handleSubmit = () => {
    isLoading(true);
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('email', email);
    formData.append('avatarFile', {
      uri:
        Platform.OS === 'ios' ? avatar.uri.replace('file://', '') : avatar.uri,
      type: 'image/jpg',
      name: avatar.uri.split(/[\\/]/).pop(), //get uri basename
    });
    axios
      .post(`${Constants.manifest.extra.apiUrl}/users/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        navigation.navigate('Login');
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
      <Input
        label="Username"
        placeholder="Username"
        leftIcon={<Icon name="user" size={24} color="black" />}
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <Input
        placeholder="Password"
        label="Password"
        leftIcon={<Icon name="key" size={24} color="black" />}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <Input
        placeholder="Password"
        label="Confirm password"
        leftIcon={<Icon name="key" size={24} color="black" />}
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry={true}
      />
      <Input
        placeholder="E-mail"
        label="E-mail"
        leftIcon={<Icon name="at" size={24} color="black" />}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Button title="Pick An Avatar" onPress={pickImage} />
      {isError && <Error error={error} />}
      <Button
        containerStyle={{ paddingTop: 20 }}
        title="Register"
        onPress={handleSubmit}
        loading={loading}
      />
    </ScrollView>
  );
};

export default Register;
