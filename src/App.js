import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font'; // Import expo-font
import CPSTest from '../components/CPS';
import KohiTest from '../components/KohiTest';
import ButterflyTest from "../components/ButterflyTest";
import SpacebarTest from "../components/SpacebarTest";
import AimTrainerTest from "../components/AimTrainerTest";
import PrivacyPolicy from "../components/PrivacyPolicy";
import Footer from "../components/Footer";
import About from "../components/About";
import Disclaimer from "../components/Disclaimer/Disclaimer";
import ContactUs from "../components/ContactUs";
import ReactionTest from "../components/ReactionTest";
import CarousalComponent from '../components/CPS/CarousalComponent';
import { LanguageProvider } from './context/LanguageContext';

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        // Add other font weights if needed
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <LanguageProvider>
      <Stack.Navigator initialRouteName="CPSTest">
       
        <Stack.Screen name="CPSTest" component={CPSTest} options={{ headerShown: false }} />
        <Stack.Screen name="KohiTest" component={KohiTest} options={{ headerShown: false }} />
        <Stack.Screen name="ReactionTest" component={ReactionTest} options={{ headerShown: false }} />
        <Stack.Screen name="ButterflyTest" component={ButterflyTest} options={{ headerShown: false }} />
        <Stack.Screen name="SpacebarTest" component={SpacebarTest} options={{ headerShown: false }} />
        <Stack.Screen name="AimTrainerTest" component={AimTrainerTest} options={{ headerShown: false }} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />
        <Stack.Screen name="Footer" component={Footer} options={{ headerShown: false }} />
        <Stack.Screen name="Disclaimer" component={Disclaimer} options={{ headerShown: false }} />
        <Stack.Screen name="About" component={About} options={{ headerShown: false }} />
        <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: false }} />
        <Stack.Screen name="CarousalComponent" component={CarousalComponent} options={{ headerShown: false }} />
        
     </Stack.Navigator>
     </LanguageProvider>
    
  );
};

export default App;