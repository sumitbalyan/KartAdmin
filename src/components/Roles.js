import React, { useEffect, useState } from 'react';
import { View, SafeAreaView , Text, StyleSheet, Dimensions, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Fab from '../shared/Fab';
import {roles} from '../services';
import { FlatListItemSeparator, Item, FlatListHeader, ListEmpty } from '../shared/FlatListItems';
import {Toast} from '../utils'

const {width : WIDTH} = Dimensions.get('window');

const Roles = (props) => {
    const [state, setstate] = useState({
      data : [],
      name : '',
      refresh : false
    });
      useEffect(() => {
        getRoles();
    }, [state.refresh===true]);

    const getRoles = async ()=>{
        try {     
            const data = await roles.getAllRoles();
            if(data.message){
                throw role.message.message;
            }
            else{
                setstate({...state, data, refresh : false});
            }
        } catch (error) {
            Toast.show('something is wrong..'+error);
        }
    }

    const addRole = async ()=>{
        try {
            const role = await roles.addRole(state.name);
            if(role.message){
                throw role.message.message;
            }
            else{
                Toast.show('role added successfully.');
                setstate({...state, refresh : true, name : ''});
            }
            
        } catch (error) {
            Toast.show('something is wrong..'+ error);
        }
  }

    const deleteRole = async (id)=>{
        try {
            const role = await roles.deleteRole(id);
            if(role.message){
                throw role.message.message;
            }
            else{
                Toast.show('role deleted successfully.');
                setstate({...state, refresh : true, name : ''});
            }
        } catch (error) {
            Toast.show('something is wrong..'+error);
        }
    }

    return (
        <SafeAreaView  style = {styles.mainContainer}>
            <View>
                <Text style = {styles.logoText}>Add Role</Text>
            </View>
            <View style = {styles.inputContainer}>
                <Icon name = {'ios-people'} size = {28} color = {'rgba(0,0,0,0.7)'} style = {styles.inputIcon} />
                <TextInput style = {styles.input} onChangeText = {(text) => setstate({...state, name : text})} value = {state.name} />
                <Fab name="add"  size={50} color='white' onClick = {addRole} />
                <FlatList style = {styles.flatList}
                    data={state.data}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    renderItem={({ item }) => <Item {...item} handleDelete = {deleteRole} />}
                    keyExtractor={item => item._id}
                    ListHeaderComponent = {()=> <FlatListHeader header = 'List of Roles' />}
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
export default Roles;
