import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import EventListScreen from "./screens/EventListScreen";
import EventDetailsScreen from "./screens/EventDetailsScreen";
import EventEditScreen from "./screens/EventEditScreen";
import FavoriteEventsScreen from './screens/FavoriteEventsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Events" component={EventListScreen} />
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
        <Stack.Screen name="EventEdit" component={EventEditScreen} />
        <Stack.Screen name="favourite" component={FavoriteEventsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
