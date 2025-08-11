import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { GET_IMG } from '../api/apiService';
import { AntDesign } from '@expo/vector-icons';

const ProductDetailsScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const { product, cart, setCart } = route.params; // Nhận thêm cart và setCart từ Feed

  // const handleAddToCart = (product: any) => {
  //   setCart((prevCart: any[]) => {
  //     const newItem = { ...product, uniqueId: Math.random().toString() };
  //     return [...prevCart, newItem];
  //   });
  //   alert('✅ Đã thêm vào giỏ hàng');
  // };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Hình ảnh sản phẩm */}
      <Image source={{ uri: GET_IMG(product.image) }} style={styles.productImage} />

      {/* Nút quay lại */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      {/* Tên sản phẩm */}
      <Text style={styles.productName}>{product.productName}</Text>

      {/* Giá sản phẩm */}
      <Text style={styles.productPrice}>${product.price}</Text>

      {/* Mô tả sản phẩm */}
      <Text style={styles.productDescription}>{product.description}</Text>

      {/* Nút thêm vào giỏ hàng */}

      {/* <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
        <Text style={styles.addButtonText}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(product)}>
        <Text style={styles.addButtonText}>🛒 Thêm vào giỏ hàng</Text>
      </TouchableOpacity> */}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 40,
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
    zIndex: 10,
  },
  // Style giống Feed
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProductDetailsScreen;
