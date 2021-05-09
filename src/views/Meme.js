import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import MemeCard from '../components/MemeCard';
import axios from 'axios';
import Error from '../components/Error';
import Constants from 'expo-constants';

const Meme = ({ route }) => { 
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [meme, setMeme] = useState({});
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    isLoading(true);
    axios
      .get(`${Constants.manifest.extra.apiUrl}/memes/meme/${route.params?.id}`)
      .then((response) => {
        setMeme({ ...response.data, author: response.data.author.username });
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      })
      .finally(() => {
        isLoading(false);
      });
  }, [route.params?.id]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  } else {
    return (
      <ScrollView>
        {isError ? <Error error={error} /> : <MemeCard meme={meme} />}
      </ScrollView>
    );
  }
};

export default Meme;
