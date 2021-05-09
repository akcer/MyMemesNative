import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
import isColorSchemeDark from './utils/isColorSchemeDark';
import Home from './src/views/Home';
import User from './src/views/User';
import Login from './src/views/Login';
import Logout from './src/views/Logout';
import Random from './src/views/Random';
import Register from './src/views/Register';
import AddNewMeme from './src/views/AddNewMeme';
import Meme from './src/views/Meme';
import UserContext from './contexts/userContext';
import axios from 'axios';
import Constants from 'expo-constants';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <HomeStack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Home}
      />
      <HomeStack.Screen name="Meme" component={Meme} />
      <HomeStack.Screen name="Author" component={User} />
    </HomeStack.Navigator>
  );
};

const App = () => {
  const Tab = createMaterialTopTabNavigator();

  const [user, setUser] = useState({
    username: null,
    avatar: null,
    role: null,
  });
  useEffect(() => {
    axios
      .get(`${Constants.manifest.extra.apiUrl}/users/authenticate`, {
        withCredentials: true,
      })
      .then((response) => {
        changeUser(
          response.data.username,
          response.data.avatar,
          response.data.role
        );
      })
      .catch((error) => {
        changeUser(null, null, null);
      });
  }, []);

  const changeUser = (username, avatar, role) => {
    setUser({
      username: username,
      avatar: avatar,
      role: role,
    });
  };
  const theme = {
    Text: {
      style: { color: isColorSchemeDark ? '#f2f2f2' : '#242424' },
    },
  };

  return (
    <SafeAreaProvider>
      <ThemeProvider useDark={isColorSchemeDark} theme={theme}>
        <UserContext.Provider value={{ changeUser, ...user }}>
          <NavigationContainer
            theme={isColorSchemeDark ? DarkTheme : DefaultTheme}
          >
            <Tab.Navigator lazy="true" initialRouteName="Home">
              <Tab.Screen name="Home" component={HomeStackScreen} />
              <Tab.Screen name="Random" component={Random} />
              {user.username && (
                <>
                  <Tab.Screen name="New" component={AddNewMeme} />
                  <Tab.Screen
                    name="User"
                    component={User}
                    initialParams={{ username: user?.username }}
                  />
                  <Tab.Screen name="Logout" component={Logout} />
                </>
              )}
              {!user.username && (
                <>
                  <Tab.Screen name="Login" component={Login} />
                  <Tab.Screen name="Register" component={Register} />
                </>
              )}
            </Tab.Navigator>
          </NavigationContainer>
        </UserContext.Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
