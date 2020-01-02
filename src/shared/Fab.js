import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PRIMARY } from '../assets/styles/colors';

const Fab = ({name, size, color, onClick}) => {
    return (
        <TouchableOpacity style={styles.button} onPress = {onClick} >
             <Icon name= {`ios-${name}`}  size={size} color={color} />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button : {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        position: 'absolute', 
        marginHorizontal : -15,
        top : 0,                                         
        bottom: 10,                                                   
        right: -10,
        height:50,
        backgroundColor:`${PRIMARY}`,
        borderRadius:100,
      }
});

export default Fab;
