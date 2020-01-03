import React, { useEffect, useState } from 'react';
import { View, SafeAreaView , Text, StyleSheet, Dimensions, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Fab from '../shared/Fab';
import {subcategories} from '../services';
import { FlatListItemSeparator, Item, FlatListHeader, ListEmpty } from '../shared/FlatListItems';
import {Toast} from '../utils'


const {width : WIDTH} = Dimensions.get('window');

const SubCategories = () => {
    const [state, setstate] = useState({
      data : [],
      name : '',
      refresh : false
    });
      useEffect(() => {
        getSubCat();
    }, [state.refresh===true]);

    const getSubCat = async ()=>{
        try {
            const data = await subcategories.getAllSubCategories();
            if(data.message){
                throw data.message.message;
            }
            else{
                setstate({...state, data, refresh : false});
            }
        } catch (error) {
            Toast.show('something is wrong..'+ error);
        }
    }

    const addCat = async ()=>{
        try {
            const data = await subcategories.addSubCategorie(state.name);
            if(data.message){
                throw role.message.message;
            }
            else{
                Toast.show('sub categorie added successfully.');
                setstate({...state, refresh : true, name : ''});
            }
        } catch (error) {
            Toast.show('something is wrong..'+ error);
        }
  }

  const deleteCat = async (id)=>{
      try {
          const data = await subcategories.deleteSubCategorie(id);
        if(data.message){
            throw role.message.message;
        }
        else{
            Toast.show('sub categorie deleted successfully.');
            setstate({...state, refresh : true, name : ''});
        }
      } catch (error) {
        Toast.show('something is wrong..'+ error);
      }
  }

    return (
        <SafeAreaView  style = {styles.mainContainer}>
            <View>
                <Text style = {styles.logoText}>Add Sub Category</Text>
            </View>
            <View style = {styles.inputContainer}>
                <Icon name = {'ios-stats'} size = {28} color = {'rgba(0,0,0,0.7)'} style = {styles.inputIcon} />
                <TextInput style = {styles.input} onChangeText = {(text) => setstate({...state, name : text})} value = {state.name} />
                <Fab name="add"  size={50} color='white' onClick = {()=>addCat()} />
                <FlatList style = {styles.flatList}
                    data={state.data}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    renderItem={({ item }) => <Item {...item} handleDelete = {deleteCat} />}
                    keyExtractor={item => item._id}
                    ListHeaderComponent = {()=> <FlatListHeader header = 'List of Sub Categories' />}
                    ListEmptyComponent = {ListEmpty}
                />
            </View>
        </SafeAreaView >
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        marginTop : 10
      },
    logoText : {
        color : "black",
        fontSize : 20,
        fontWeight : "800",
        fontStyle : "italic",
        marginTop : 10,
    },
    inputContainer : {
        marginTop : 10
    },
    input : {
        width : WIDTH - 100,
        height : 45,
        borderRadius : 25,
        fontSize : 20,
        paddingLeft : 45,
        color : 'black',
        backgroundColor : 'rgba(0,0,0,0.35)',
        marginHorizontal : 25,
    },
    flatList : {
        marginTop : 20
    },
    inputIcon : {
      position : 'absolute',
      top : 8,
      left : 37
  }
});
export default SubCategories;
