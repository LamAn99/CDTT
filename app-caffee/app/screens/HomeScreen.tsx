import React from 'react'
const Tab = createBottomTabNavigator();
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Feed from './hometab/Feed';
import AboutScreen from './AboutScreen';
import ProfileScreen from './ProfileScreen';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import ProductPage from './ProductPage';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#333',
        headerShown: false
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />

          ),
        }}
      />
      <Tab.Screen
        name="ProductPage"
        component={ProductPage}
        options={{
          tabBarLabel: 'Payment',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="card" color={color} size={size} />

          ),
        }}
      />
      <Tab.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          tabBarLabel: 'Order',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-list-outline" color={color} size={size} />

          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />

          ),
        }}
      />




    </Tab.Navigator>
  );
}

export default HomeScreen