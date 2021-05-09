import React, { useState, useContext } from 'react';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import axios from 'axios';
import UserContext from '../../contexts/userContext';
import Error from '../components/Error';
import Constants from 'expo-constants';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, isLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const user = useContext(UserContext);

  const handleSubmit = () => {
    isLoading(true);
    axios
      .post(
        `${Constants.manifest.extra.apiUrl}/users/login/local`,
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        user.changeUser(
          response.data.username,
          response.data.avatar,
          response.data.role
        );
        navigation.navigate('User', { username: response.data.username });
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
      {isError && <Error error={error} />}
      <Button title="Login" onPress={handleSubmit} loading={loading} />
    </ScrollView>
  );
};

export default Login;
