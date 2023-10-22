import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyTabs from './navigation/MyTabs';

// Nested Screens
import ViewRecipeScreen from './navigation/screens/ViewRecipeScreen';
import AddRecipeScreen from './navigation/screens/AddRecipeScreen';
import DraftRecipeScreen from './navigation/screens/DraftRecipeScreen';
import SavedRecipesScreen from './navigation/screens/SavedRecipesScreen';
import AuthorPageScreen from './navigation/screens/AuthorPageScreen';
import PublishedRecipeScreen from './navigation/screens/publishedRecipeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={({ route }) => ({
              headerShown: 
              route.name === "viewRecipe" || 
              route.name === "addRecipe" ||
              route.name === "addReview" ||
              route.name === "draftRecipe" ||
              route.name === "savedRecipe" ||
              route.name === "publishedRecipe" ||
              route.name === "AuthorPage",
              })}>

            <Stack.Screen name="Tab" component={MyTabs}/>
            <Stack.Screen name="viewRecipe" component={ViewRecipeScreen} options={{title: ""}} />
            <Stack.Screen name="addRecipe" component={AddRecipeScreen} options={{title: ""}}/>
            <Stack.Screen name="draftRecipe" component={DraftRecipeScreen} options={{title: ""}}/>
            <Stack.Screen name="savedRecipe" component={SavedRecipesScreen} options={{title: ""}}/>
            <Stack.Screen name="publishedRecipe" component={PublishedRecipeScreen} options={{title: ""}}/>
            <Stack.Screen name="AuthorPage" component={AuthorPageScreen} options={{title: ""}}/>
          </Stack.Navigator>
        </NavigationContainer>
    

  ); 
}


