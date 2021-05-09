import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import axios from 'axios';
import UserContext from '../../contexts/userContext';
import Error from '../components/Error';
import Constants from 'expo-constants';

const Logout = ({ navigation }) => {  
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const user = useContext(UserContext);
  const [loading, isLoading] = useState(false);

  const handlePress = () => {
    isLoading(true);
    axios
      .get(`${Constants.manifest.extra.apiUrl}/users/logout`, {
        withCredentials: true,
      })
      .then((response) => {
        user.changeUser(null, null, null);
        navigation.navigate('Home');
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
    <View style={styles.container}>
      {isError && <Error error={error} />}
      <Button title="Logout" onPress={handlePress} loading={loading} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 30,
  },
});
export default Logout;
