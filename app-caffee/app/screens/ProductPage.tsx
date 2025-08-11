import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { format } from 'date-fns'; // Import hàm format từ date-fns
import { useNavigation } from '@react-navigation/native'; // Import useNavigation để sử dụng navigation

const PaymentPage = ({ route }) => {
  // Kiểm tra xem route.params có tồn tại và có 'cartItems' hay không
  const cartItems = route?.params?.cartItems || []; // Nếu không có, sử dụng mảng trống

  const [currentDateTime, setCurrentDateTime] = useState('');
  const navigation = useNavigation(); // Khai báo useNavigation để sử dụng navigation

  // Lấy và định dạng ngày giờ hiện tại
  useEffect(() => {
    const dateTime = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
    setCurrentDateTime(dateTime);
  }, []);

  // Tính tổng tiền của giỏ hàng
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.productName}>{item.productName}</Text>
      <Text style={styles.productPrice}>{item.price}$</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thông tin thanh toán</Text>

      {/* Hiển thị ngày giờ hiện tại */}
      <Text style={styles.dateTime}>Ngày giờ: {currentDateTime}</Text>

      {/* Danh sách các sản phẩm trong giỏ hàng */}
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.uniqueId}
      />

      {/* Tổng tiền */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng tiền: {calculateTotal()}$</Text>
      </View>

      {/* Nút thanh toán */}
      <TouchableOpacity
        style={styles.paymentButton}
        onPress={() => navigation.navigate('AboutScreen', { totalAmount: calculateTotal() })} >
        <Text style={styles.paymentButtonText}>Thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5DC',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dateTime: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    marginLeft: 210,
    paddingLeft: 20,
    color: '#FF9800',
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5733',
  },
  paymentButton: {
    marginTop: 20,
    backgroundColor: '#FF5733',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  paymentButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PaymentPage;
