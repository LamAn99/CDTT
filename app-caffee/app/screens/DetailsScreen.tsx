import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { GET_IMG } from '../api/apiService';
import { AntDesign } from '@expo/vector-icons';

const ProductDetailsScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const { product } = route.params; // Nhận dữ liệu sản phẩm từ navigation

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Hình ảnh sản phẩm */}
      <Image source={{ uri: GET_IMG(product.image) }} style={styles.productImage} />

      {/* Tên sản phẩm */}
      <Text style={styles.productName}>{product.productName}</Text>

      {/* Giá sản phẩm */}
      <Text style={styles.productPrice}>${product.price}</Text>

      {/* Mô tả sản phẩm */}
      <Text style={styles.productDescription}>{product.description}</Text>

      {/* Quay lại */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: 500,
    borderRadius: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  productPrice: {
    fontSize: 20,
    color: '#FF9800',
    marginVertical: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 50,
  },
});

export default ProductDetailsScreen;
