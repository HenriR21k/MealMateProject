import * as React from 'react';
import { View, Button, StyleSheet, Text, FlatList, Pressable, ScrollView, Image, Modal } from "react-native";
import { StatusBar } from 'expo-status-bar';
import axios, { Axios } from 'axios';
import { useState ,useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../../component/Card';
import EditCard from '../../component/EditCard';
import { loggedInUser } from '../../api/currentUser';
import useLoad from '../../api/useLoad';
import API from '../../api/apiRequest';


export default function MyRecipesScreen({ navigation }) {

    const User = loggedInUser

    const endpoint = `recipe/draft/user/${User}`
    const [recipes, setRecipes, loadingMessage, loadRecipes] = useLoad(endpoint);
      
    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        loadRecipes(endpoint);
        //console.log(recipes);
      });
      return unsubscribe;
    }, [navigation]);

    React.useEffect(() => { loadRecipes(endpoint) }, []);

    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('addRecipe')}>
              <MaterialIcons name="add" size={24} color="black" />
            </Pressable>
          )
        })
      }, []);

     
      return (
        <View style={styles.container}>

          
           <FlatList
            data={recipes}
            renderItem={({ item }) => {
              return (
              <Pressable onPress={() => navigation.navigate('draftRecipe', {
                recipeID: item.RecipeID,
                recipeName: item.RecipeName,
                recipeDescription: item.RecipeDescription,
                recipeURL: item.RecipeURL,
                recipeDate: item.datePosted,
                UserID: item.UserID

              })}>  
              <EditCard 
              info={item} 
              loadRecipes={loadRecipes}
              />
              </Pressable>
              );
            }}
            keyExtractor={(recipe) => recipe.RecipeID.toString()}
            showsVerticalScrollIndicator={false}
            extraData={recipes}
          />
          
          
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: 'rgba(255, 204, 255, 0.5)'
    },
  });