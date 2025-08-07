import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoadingScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      {/* Checkmark Icon */}
      <View style={styles.iconContainer}>
        <Image
          source={require('../../assets/images/loading.gif')} // Đảm bảo đường dẫn chính xác
        />
      </View>

      {/* Order Paid Text */}
      <Text style={styles.title}>Your order is paid</Text>
      <Text style={styles.subtitle}>you can track order below</Text>

      {/* Button */}
      <TouchableOpacity onPress={() => navigation.push('Home')} style={styles.button}>
        <Text style={styles.buttonText}>Back Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconContainer: {
    marginBottom: 30,
  },
  icon: {
    width: 100,
    height: 100,
    tintColor: '#D80C5A', // Apply the red color to the icon
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoadingScreen;