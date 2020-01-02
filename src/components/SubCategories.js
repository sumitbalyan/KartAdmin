import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Fab from '../shared/Fab';
import { PRIMARY } from '../assets/styles/colors';

const SubCategories = () => {
    return (
        <View style = {styles.mainContainer}>
            <Text>SubCategories</Text>
            <Fab name="add"  size={50} color={PRIMARY} />
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
      }
});
export default SubCategories;
