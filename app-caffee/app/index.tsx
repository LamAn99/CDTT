import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';

import LoginScreen from './screens/login/LoginScreen';
import RegisterScreen from './screens/login/RegisterScreen';
import DetailsScreen from './screens/DetailsScreen';
import PaymentScreen from './screens/PaymentScreen';
import AboutScreen from './screens/AboutScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoadingScreen from './screens/LoadingScreen';
import Itemproduct from './screens/hometab/items/Itemproduct';
import OrderScreen from './screens/OrderScreen';
import ProductPage from './screens/ProductPage';
import Cart from './screens/Cart';
import ChangePassword from './screens/login/ChangePassword';
import ThankyouScreen from './screens/ThankyouScreen';
import OtpScreen from './screens/login/OtpScreen';



const Stack = createNativeStackNavigator();
const index = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProductPage" component={ProductPage} options={{ headerShown: false }} />
        <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Order" component={OrderScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Itemproduct" component={Itemproduct} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default index