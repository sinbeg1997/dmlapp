import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ImageBackground } from 'react-native';
import DashBoard from './src/screens/Dashboard';
import Feeding from "./src/screens/Feeding";
import ManageDragon from "./src/screens/ManageDragon";
import { AppProvider } from "./src/providers/AppProviver";

const Stack = createStackNavigator();

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Dashboard"
            component={DashBoard}
          />
          <Stack.Screen name="Feeding" component={Feeding} />
          <Stack.Screen name="Manage your dragon collection" component={ManageDragon} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;