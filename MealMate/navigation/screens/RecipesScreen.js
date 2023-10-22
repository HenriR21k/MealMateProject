import * as React from 'react';
import { View, Button, StyleSheet, Text, FlatList, Pressable, ScrollView, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import axios, { Axios } from 'axios';
import { useState ,useEffect } from 'react';
import Card from '../../component/Card';
import { loggedInUser } from '../../api/currentUser';
import useLoad from '../../api/useLoad';
import API from '../../api/apiRequest';


export default function RecipesScreen({ navigation }) {

  
    const endpoint = 'recipe'
    const [recipes, setRecipes, loadingMessage, loadRecipes] = useLoad(endpoint);
     
    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        loadRecipes(endpoint);
        //console.log(recipes);
      });
      return unsubscribe;
    }, [navigation]);

    

     const testRecipeObject = {
      RecipeName: "Pizza",
      RecipeDescription: "fresh pizza",
      RecipeURL: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chan-walrus-958545.jpg&fm=jpg",
      datePosted: "2023-03-30T08:26:58.000Z",
      isPublished: "published",
      UserID: 1
    }

    const testRecipeObjectController = async (testRecipeObject) => {
      const outcome = await API.post('recipe', testRecipeObject);
      //fetchRecipes();
      loadRecipes(endpoint);
      
    };

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