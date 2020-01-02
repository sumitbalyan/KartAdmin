import React, { useEffect, useState } from 'react';
import { View, SafeAreaView , Text, StyleSheet, Dimensions, TextInput, FlatList,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Fab from '../shared/Fab';
import { PRIMARY } from '../assets/styles/colors';
import {categories} from '../services';


const {width : WIDTH} = Dimensions.get('window');

  function Item({ title }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style = {styles.btnEdit}>
            <Icon name="ios-create"  size={25} color={PRIMARY} />
        </TouchableOpacity>
        <TouchableOpacity style = {styles.btnDelete}>
            <Icon name="ios-remove-circle"  size={25} color='tomato' />
        </TouchableOpacity> 
      </View>
    );
  }

  const FlatListHeader = () => {
    return (
      <View elevation={1} 
        style={{
          height: 40,
          width: "100%",
          margin: 5,
          backgroundColor: "#fff",
          border: 2.9,
          borderColor: "black",
          alignSelf: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 16,
          },
          shadowOpacity: 1,
          shadowRadius: 7.49
        }}
      >
        <Text style={{  textShadowColor: 'black', textShadowOffset: { width: 1, height: 3 },textShadowRadius: 10, fontSize: 40, fontWeight: '800', flex: 1, alignSelf: "center", paddingTop: 5, fontSize: 20}}>List of Categories</Text>
      </View>
    );
  }
  const FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
    );
  };

 const ListEmpty = () => {
    return (
      //View to show when list is empty
      <View style={styles.MainContainer}>
        <Text style={{ textAlign: 'center' }}>No Data Found</Text>
      </View>
    );
  };

const Categories = () => {
    const [state, setstate] = useState({
      data : [],
      name : '',
      isAdded : false
    });
      useEffect(() => {
        getCat();
        //alert('useEffect', JSON.stringify(state.data));
    }, [state.isAdded===true]);

    const getCat = async ()=>{
        const data = await categories.getAllCategories();
        setstate({...state, data, isAdded : false});
    }

    const addCat = async ()=>{
      await categories.addCategorie(state.name);
      setstate({...state, isAdded : true, name : ''});
  }

    return (
        <SafeAreaView  style = {styles.mainContainer}>
            <View>
                <Text style = {styles.logoText}>Add Category</Text>
            </View>
            <View style = {styles.inputContainer}>
                <Icon name = {'ios-stats'} size = {28} color = {'rgba(0,0,0,0.7)'} style = {styles.inputIcon} />
                <TextInput style = {styles.input} autoFocus = {true} onChangeText = {(text) => setstate({...state, name : text})} value = {state.name} />
                <Fab name="add"  size={50} color='white' onClick = {()=>addCat()} />
                <FlatList style = {styles.flatList}
                    data={state.data}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    renderItem={({ item }) => <Item title={item.name} />}
                    keyExtractor={item => item._id}
                    ListHeaderComponent = {FlatListHeader}
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
      emptyContainer : {
        justifyContent: 'center',
        flex: 1,
        margin: 10,
      },
      logoContainer : {
        alignItems : "center",
        marginBottom : 50
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
    item: {
        padding: 2,
        marginVertical: 2,
        marginHorizontal: 5,
        justifyContent : 'space-between'
      },
      title: {
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
    },
    inputIcon : {
        position : 'absolute',
        top : 8,
        left : 37
    }
});
export default Categories;
