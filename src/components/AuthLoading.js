import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { PRIMARY } from '../assets/styles/colors';
import { Token } from '../utils/Token';

export default class AuthLoading extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const parseToken = await Token.readAsyncStorageByKey('userDetail');
    //Get token
    const token = parseToken.token;
    //Check if token is expired
    const expire = (token === undefined) ? true : Token.isExpired(token);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(!expire ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar  backgroundColor = {'white'} barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });