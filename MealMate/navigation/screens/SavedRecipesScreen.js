import * as React from 'react';
import { View, Button, StyleSheet, Text, FlatList, Pressable, ScrollView, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import axios, { Axios } from 'axios';
import { useState ,useEffect } from 'react';
import Card from '../../component/Card';
import { loggedInUser } from '../../api/currentUser';
import useLoad from '../../api/useLoad';
import API from '../../api/apiRequest';


export default function SavedRecipesScreen({ navigation, route }) {

    const {UserID} = route.params;
  
    const endpoint = `saved/recipe/user/${UserID}`
    const [recipes, setRecipes, loadingMessage, loadRecipes] = useLoad(endpoint);
     
    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        loadRecipes(endpoint);
        //console.log(recipes);
      });
      return unsubscribe;
    }, [navigation]);


    React.useEffect(() => { loadRecipes(endpoint) }, []);

    
      return (
        <View style={styles.container}>

          <FlatList
            data={recipes}
            renderItem={({ item }) => {
              return (
              <Pressable onPress={() => navigation.navigate('viewRecipe', {
                recipeID: item.RecipeID,
                recipeName: item.RecipeName,
                recipeDescription: item.RecipeDescription,
                recipeURL: item.RecipeURL,
                recipeDate: item.datePosted,
                UserID: item.UserID

              })}>  
              <Card info={item} />
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