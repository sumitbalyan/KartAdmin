import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PRIMARY } from '../assets/styles/colors';

  //List item
const Item = ({ name, _id, handleDelete })=> {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{name}</Text>
        <TouchableOpacity style = {styles.btnEdit}>
            <Icon name="ios-create"  size={25} color={PRIMARY} />
        </TouchableOpacity>
        <TouchableOpacity style = {styles.btnDelete} onPress = {()=>handleDelete(_id)} >
            <Icon name="ios-remove-circle"  size={25} color='tomato' />
        </TouchableOpacity> 
      </View>
    );
  }
  //List header
  const FlatListHeader = ({header}) => {
    return (
      <View elevation={1} style={styles.flatListHeader}>
        <Text style={styles.headerText}>{header}</Text>
      </View>
    );
  }
  //Item Separator
  const FlatListItemSeparator = () => {
    return (
      <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
    );
  };
//View to show when list is empty
 const ListEmpty = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={{ textAlign: 'center' }}>No Data Found</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        marginTop : 10
      },
      flatListHeader : {
        height: 40,
        width: "100%",
        margin: 5,
        backgroundColor: "#fff",
        borderWidth: 2.9,
        borderColor: "black",
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 16,
        },
        shadowOpacity: 1,
        shadowRadius: 7.49
      },
    headerText : {  
        textShadowColor: 'black', 
        textShadowOffset: { width: 1, height: 3 },
        textShadowRadius: 10, 
        fontSize: 40, 
        fontWeight: '800', 
        flex: 1, 
        alignSelf: "center", 
        paddingTop: 5, 
        fontSize: 20
    },
    item: {
        padding: 2,
        marginVertical: 2,
        marginHorizontal: 5,
        justifyContent : 'space-between'
      },
      itemText: {
        fontSize: 16,
        color:  `${PRIMARY}`,
        fontWeight : "900",
      },
      btnDelete : {
          position : 'absolute',
          marginHorizontal : -15,
          top : 0,                                         
          bottom: 10,                                                   
          right: 10,
      },
      btnEdit : {
        position : 'absolute',
        marginHorizontal : -5,
        top : 0,                                         
        bottom: 10,                                                   
        right: 20,
    }
});

export {
    Item,
    FlatListHeader,
    FlatListItemSeparator,
    ListEmpty
}