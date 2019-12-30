/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/navigations';
import {name as appName} from './app.json';
import { useScreens } from 'react-native-screens';

useScreens();

AppRegistry.registerComponent(appName, () => App);
