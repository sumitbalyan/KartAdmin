import React, { useEffect, useState } from 'react';
import { View, SafeAreaView , Text, StyleSheet, Dimensions, TextInput, FlatList,TouchableOpacity, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Fab from '../shared/Fab';
import {categories} from '../services';
import { FlatListItemSeparator, Item, FlatListHeader, ListEmpty } from '../shared/FlatListItems';
import {Toast} from '../utils'


const {width : WIDTH} = Dimensions.get('window');

const Categories = () => {
    const [state, setstate] = useState({
      data : [],
      name : '',
      refresh : false
    });
      useEffect(() => {
        getCat();
        //alert('useEffect', JSON.stringify(state.data));
    }, [state.refresh===true]);

    const getCat = async ()=>{
        const data = await categories.getAllCategories();
        try {
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
            const data = await categories.addCategorie(state.name);
            if(data.message){
                throw data.message.message;
            }
            else{
                Toast.show('categorie added successfully.');
                setstate({...state, refresh : true, name : ''});
            }
        } catch (error) {
            Toast.show('something is wrong..'+ error);
        }
     
     
  }

  const deleteCat = async (id)=>{
    try {
        const data = await ategories.deleteCategorie(id);
        if(data.message){
            throw data.message.message;
        }
        else{
            Toast.show('categorie deleted successfully.');
            setstate({...state, refresh : true, name : ''});
        }
    } catch (error) {
        Toast.show('something is wrong..'+ error);
    }
   
  }

    return (
        <SafeAreaView  style = {styles.mainContainer}>
            <View>
                <Text style = {styles.logoText}>Add Category</Text>
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
                    ListHeaderComponent = {()=> <FlatListHeader header = 'List of Categories' />}
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
export default Categories;
