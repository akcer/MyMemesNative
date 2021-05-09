import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, View } from 'react-native';
import { ButtonGroup, Button, Text } from 'react-native-elements';
import axios from 'axios';
import MemeCard from '../components/MemeCard';
import Error from '../components/Error';
import isColorSchemeDark from '../../utils/isColorSchemeDark';
import Constants from 'expo-constants';

const Home = () => {
  const [skip, setSkip] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [gallery, setGallery] = useState([]);
  const [loading, isLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const sortButtons = ['newest', 'oldest', 'top'];
  const limit = 5;

  useEffect(() => {
    isLoading(true);
    axios
      .get(
        `${Constants.manifest.extra.apiUrl}/memes?limit=${limit}&skip=${skip}&sort=${sortButtons[selectedIndex]}`
      )
      .then((response) => {
        setGallery(response.data);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      })
      .finally(() => {
        isLoading(false);
      });
  }, [selectedIndex, skip]);

  const renderItem = ({ item }) => {
    const meme = { ...item, author: item.author.username };
    return <MemeCard meme={meme} />;
  };

  const updateIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
    setSkip(0);
  };

  const galleryNav = (
    <ButtonGroup
      onPress={updateIndex}
      selectedIndex={selectedIndex}
      buttons={sortButtons}
      containerStyle={
        isColorSchemeDark ? { backgroundColor: 'transparent' } : {}
      }
    />
  );

  const pagination = (
    <View style={style.pagination}>
      <Button
        title="Prev"
        disabled={!(skip / limit)}
        onPress={() => setSkip((prevState) => prevState - limit)}
      />
      <View style={style.pagination__page}>
        <Text h4>Page: {skip / limit + 1}</Text>
      </View>
      <Button
        title="Next"
        disabled={gallery.length < limit}
        onPress={() => setSkip((prevState) => prevState + limit)}
      />
    </View>
  );
  if (gallery.length == 0) {
    return <Text style={{ textAlign: 'center' }}>No Memes Yet</Text>;
  } else if (loading) {
    return <ActivityIndicator size="large" />;
  } else {
    return (
      <>
        {isError ? (
          <Error error={error} />
        ) : (
          <FlatList
            data={gallery}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ListHeaderComponent={galleryNav}
            ListFooterComponent={pagination}
            ListFooterComponentStyle={style.list__footer}
          />
        )}
      </>
    );
  }
};

const style = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
  },
  pagination__page: {
    paddingHorizontal: 10,
  },
  list__footer: {
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Home;
