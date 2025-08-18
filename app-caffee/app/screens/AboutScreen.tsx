import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';

const ThankYouScreen = ({ navigation, route }) => {
  const { totalAmount } = route.params || {};

  // Lấy ngày giờ hiện tại
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'dd/MM/yyyy HH:mm');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi!</Text>
      <Text style={styles.subHeader}>Thanh toán thành công!</Text>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng tiền: {totalAmount}$</Text>
      </View>

      {/* Hiển thị ngày và giờ */}
      <Text style={styles.dateText}>Ngày giờ: {formattedDate}</Text>

      {/* Thông điệp */}
      <Text style={styles.thankYouText}>
        Chúng tôi sẽ xử lý đơn hàng của bạn ngay lập tức và gửi thông báo khi đơn hàng được giao.
      </Text>

      {/* Nút trở về trang chủ */}
      <TouchableOpacity
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: 'red',
          borderRadius: 5,
        }}
        onPress={() => navigation.navigate('Home')} // Quay về màn Home
      >
        <Text style={{ color: 'white' }}>Về Trang Chủ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '500',
    color: '#4CAF50',
    marginBottom: 20,
  },
  totalContainer: {
    marginBottom: 30,
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  dateText: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  thankYouText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FF5733',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ThankYouScreen;
