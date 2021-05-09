import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Text, Card } from 'react-native-elements';
import axios from 'axios';
import Error from '../components/Error';
import Constants from 'expo-constants';

const User = ({ route }) => {
  const [user, setUser] = useState({});
  const [loading, isLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    isLoading(true);
    axios
      .get(
        `${Constants.manifest.extra.apiUrl}/users/user/${route.params?.username}`
      )
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      })
      .finally(() => {
        isLoading(false);
      });
  }, [route.params?.username]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  } else {
    return (
      <>
        {isError ? (
          <Error error={error} />
        ) : (
          <Card>
            <Card.Title>{user.username}</Card.Title>
            <Card.Divider />
            <Card.Image
              style={{ resizeMode: 'contain' }}
              source={{
                uri: `${Constants.manifest.extra.apiUrl}/avatars/${
                  user.avatar || 'default-avatar.png'
                }`,
              }}
              PlaceholderContent={<ActivityIndicator />}
            />
            <Text style={{ textAlign: 'center' }}>
              Account created: {new Date(user?.createdAt).toDateString()}
            </Text>
          </Card>
        )}
      </>
    );
  }
};

export default User;
