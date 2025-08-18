import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const PaymentPage = ({ route }) => {
  const cartItems = route?.params?.cartItems || [];
  const [currentDateTime, setCurrentDateTime] = useState('');

  const navigation = useNavigation();

  // Thông tin địa chỉ nhận hàng
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Hình thức thanh toán
  const [paymentMethod, setPaymentMethod] = useState('COD'); // mặc định là COD

  useEffect(() => {
    const dateTime = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
    setCurrentDateTime(dateTime);
  }, []);

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + (item.price * item.quantity), 0)
      .toLocaleString();
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.productName}>{item.productName}</Text>
      <Text style={styles.productPrice}>{item.price}$</Text>
    </View>
  );

  const handlePayment = () => {
    navigation.navigate('AboutScreen', {
      totalAmount: calculateTotal(),
      orderInfo: {
        name,
        phone,
        address,
        paymentMethod,
        cartItems,
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Thông tin thanh toán</Text>

      {/* Hiển thị ngày giờ hiện tại */}
      <Text style={styles.dateTime}>Ngày giờ: {currentDateTime}</Text>

      {/* Thông tin nhận hàng */}
      <View style={styles.infoContainer}>
        <Text style={styles.sectionHeader}>Địa chỉ nhận hàng</Text>
        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="Địa chỉ nhà"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      {/* Danh sách sản phẩm */}
      <View style={styles.infoContainer}>
        <Text style={styles.sectionHeader}>Sản phẩm trong giỏ</Text>
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={item => item.uniqueId}
        />
      </View>

      {/* Hình thức thanh toán */}
      <View style={styles.infoContainer}>
        <Text style={styles.sectionHeader}>Hình thức thanh toán</Text>

        <TouchableOpacity
          style={[styles.methodButton, paymentMethod === 'COD' && styles.activeMethod]}
          onPress={() => setPaymentMethod('COD')}
        >
          <Text style={styles.methodText}>Thanh toán khi giao hàng (COD)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.methodButton, paymentMethod === 'Bank' && styles.activeMethod]}
          onPress={() => setPaymentMethod('Bank')}
        >
          <Text style={styles.methodText}>Thanh toán Online - Ngân hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.methodButton, paymentMethod === 'Momo' && styles.activeMethod]}
          onPress={() => setPaymentMethod('Momo')}
        >
          <Text style={styles.methodText}>Thanh toán Online - Momo</Text>
        </TouchableOpacity>
      </View>

      {/* Tổng tiền */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng tiền: {calculateTotal()}$</Text>
      </View>

      {/* Nút Thanh toán */}
      <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
        <Text style={styles.paymentButtonText}>Thanh toán</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5DC',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  dateTime: {
    fontSize: 16,
    marginBottom: 15,
    color: '#555',
    textAlign: 'center',
  },
  infoContainer: {
    marginTop: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 16,
    color: '#FF9800',
    fontWeight: '600',
  },
  methodButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
  },
  activeMethod: {
    borderColor: '#FF5733',
    backgroundColor: '#ffe5dd',
  },
  methodText: {
    fontSize: 16,
    color: '#333',
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5733',
  },
  paymentButton: {
    marginTop: 25,
    backgroundColor: '#FF5733',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  paymentButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PaymentPage;


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import { format } from 'date-fns'; // Import hàm format từ date-fns
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation để sử dụng navigation

// const PaymentPage = ({ route }) => {
//   // Kiểm tra xem route.params có tồn tại và có 'cartItems' hay không
//   const cartItems = route?.params?.cartItems || []; // Nếu không có, sử dụng mảng trống

//   const [currentDateTime, setCurrentDateTime] = useState('');
//   const navigation = useNavigation(); // Khai báo useNavigation để sử dụng navigation

//   // Lấy và định dạng ngày giờ hiện tại
//   useEffect(() => {
//     const dateTime = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
//     setCurrentDateTime(dateTime);
//   }, []);

//   // Tính tổng tiền của giỏ hàng
//   const calculateTotal = () => {
//     // return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
//     return cartItems
//       .reduce((total, item) => total + (item.price * item.quantity), 0)
//       .toLocaleString();
//   };

//   const renderCartItem = ({ item }) => (
//     <View style={styles.cartItem}>
//       <Text style={styles.productName}>{item.productName}</Text>
//       <Text style={styles.productPrice}>{item.price}$</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Thông tin thanh toán</Text>

//       {/* Hiển thị ngày giờ hiện tại */}
//       <Text style={styles.dateTime}>Ngày giờ: {currentDateTime}</Text>

//       {/* Danh sách các sản phẩm trong giỏ hàng */}
//       <FlatList
//         data={cartItems}
//         renderItem={renderCartItem}
//         keyExtractor={item => item.uniqueId}
//       />

//       {/* Tổng tiền */}
//       <View style={styles.totalContainer}>
//         <Text style={styles.totalText}>Tổng tiền: {calculateTotal()}$</Text>
//       </View>

//       {/* Nút thanh toán */}
//       <TouchableOpacity
//         style={styles.paymentButton}
//         onPress={() => navigation.navigate('AboutScreen', { totalAmount: calculateTotal() })} >
//         <Text style={styles.paymentButtonText}>Thanh toán</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#F5F5DC',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   dateTime: {
//     fontSize: 16,
//     marginBottom: 20,
//     color: '#555',
//   },
//   cartItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//   },
//   productName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   productPrice: {
//     fontSize: 16,
//     marginLeft: 210,
//     paddingLeft: 20,
//     color: '#FF9800',
//   },
//   totalContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   totalText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#FF5733',
//   },
//   paymentButton: {
//     marginTop: 20,
//     backgroundColor: '#FF5733',
//     paddingVertical: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   paymentButtonText: {
//     fontSize: 18,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default PaymentPage;
