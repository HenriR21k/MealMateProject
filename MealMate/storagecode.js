  /*
  const fetchApi = async () => {
    try {
      const res = await axios.get('http://10.130.66.94:3000/test')
      console.log(res.data+" If your seeing this message, the backend is successfully hooked up")
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchApi();
  }, []);

  insert into return <CameraComponent/>



  <Tab.Navigator
        initialRouteName={recipeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === recipeName) {
              iconName = focused ? 'ice-cream' : 'ice-cream-outline';
            } 
            else if (rn === MyRecipeName) {
              iconName = focused ? 'library' : 'library-outline';
            } 
            else if (rn === mealPlanName) {
              iconName = focused ? 'clipboard' : 'clipboard-outline';
            }
            else if (rn === profileName) {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        >

import * as React from 'react';
import { View, Button, StyleSheet, Text, FlatList, Pressable, ScrollView, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import axios, { Axios } from 'axios';
import { useState ,useEffect } from 'react';


import Header from '../../component/Header';
import Card from '../../component/Card';
import { loggedInUser } from '../../api/currentUser';
import useLoad from '../../api/useLoad';
import API from '../../api/apiRequest';


export default function RecipesScreen({ navigation }) {

  
    const endpoint = 'recipe'
    //const [recipes, setRecipes, loadingMessage, loadRecipes] = useLoad(endpoint);
    const [loadingMessage, setLoadingMessage] = useState("Loading records ...");
    const [recipes, setRecipes] = useState(null)
   
    const fetchRecipes = async () => {
      const outcome = await API.get('recipe');
      setRecipes (outcome.result);
      
    }
    

    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        fetchRecipes();
        //console.log(recipes);
      });
      return unsubscribe;
    }, [navigation]);

    useEffect(() => { fetchRecipes() }, []);

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
      fetchRecipes();
      
    };

    

   

      return (
        <View style={styles.container}>

        <Button
        title={`Test`}
        onPress={() => testRecipeObjectController(testRecipeObject)}/>
        
        
          <FlatList
            data={recipes}
            renderItem={({ item }) => {
              return (
              <Pressable onPress={() => navigation.navigate('viewRecipe', {
                recipeID: item.RecipeID,
                recipeName: item.RecipeName,
                recipeDescription: item.RecipeDescription,
                recipeURL: item.RecipeURL,
                recipeDate: item.datePosted

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
    },
  });

   {/*
                      <FlatList
                          data={ingredients}
                          renderItem={({ item }) => {
                          return (
                          <Text>{item.IngredientName}</Text>
                          );
                          }}
                          keyExtractor={(ingredient) => ingredient.IngredientID.toString()}
                          showsVerticalScrollIndicator={false}
                          scrollEnabled={false}
                      />

  const AccessImage = (data) => {

  const handleUpload = (Image) => {
    const data = new FormData()
    data.append('file', Image)
    data.append('upload_preset', 'k2017731')
    data.append('cloud_name', 'dcpxszs6j')

    fetch("https://api.cloudinary.com/v1_1/dcpxszs6j/image/upload", {
      method:"POST",
      body: data
    }).then(res=>res.json()).then(data=>{
      console.log(data.url)
    })
  }

  if(!data.cancelled) {
    let newfile = {
      uri: data.uri,
      type: `test/${data.uri.split(".")[1]}`,
      name: `test/${data.uri.split(".")[1]}`,
    }

  handleUpload(newfile)
  }

 



}


export default AccessImage;

                        */


  