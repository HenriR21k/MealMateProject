import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import RecipesScreen from './screens/RecipesScreen';
import MyRecipesScreen from './screens/MyRecipesScreen';
import FolloweeScreen from './screens/FolloweeScreen';
import ProfileScreen from './screens/ProfileScreen';

//Screen names
const recipeName = "Recipes";
const MyRecipeName = "My Recipes";
const followeeName = "Following";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
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
        else if (rn === followeeName) {
          iconName = focused ? 'clipboard' : 'clipboard-outline';
        }
        else if (rn === profileName) {
          iconName = focused ? 'person-circle' : 'person-circle-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    >
        <Tab.Screen name={recipeName} component={RecipesScreen} />
        <Tab.Screen name={MyRecipeName} component={MyRecipesScreen} />
        <Tab.Screen name={followeeName} component={FolloweeScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />
      </Tab.Navigator>
  );
}

export default MyTabs;