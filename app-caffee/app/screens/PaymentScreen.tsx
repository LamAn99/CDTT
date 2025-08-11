import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome5 } from '@expo/vector-icons';

const PaymentScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome5 name="arrow-left" size={24} />
      </TouchableOpacity>
          <Text style={styles.title}>Credit Card Details</Text>
        </View>

        <View style={styles.paymentMethod}>
          <Text style={styles.label}>Payment Method</Text>
          <View style={styles.iconsContainer}>
            <Image source={require('../../assets/images/Visa.png')} />
            <Image source={require('../../assets/images/Mastercard.png')} />
            <Image source={require('../../assets/images/American Express.png')} />
            <Image source={require('../../assets/images/Discover.png')} />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name on card</Text>
          <TextInput placeholder="John Doe" style={styles.input} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Card number</Text>
          <TextInput placeholder="0000 0000 0000 0000" style={styles.input} />
        </View>

        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Text style={styles.inputLabel}>Card expiration</Text>
            <Picker style={styles.input}>
              <Picker.Item label="Month" value="month" />
            </Picker>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.inputLabel}>&nbsp;</Text>
            <Picker style={styles.input}>
              <Picker.Item label="Year" value="year" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Card Security Code</Text>
          <TextInput placeholder="Code" style={styles.input} />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('LoadingScreen')} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F0F4F8', // Màu nền nhạt, nhẹ nhàng
    },
    card: {
      backgroundColor: '#FFFFFF', // Nền trắng cho thẻ
      padding: 20,
      borderRadius: 10,
      width: '90%',
      maxWidth: 400,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2, // Tạo hiệu ứng nổi nhẹ cho thẻ
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      position: 'relative',
    },
    title: {
      fontSize: 18,
      color: '#333333', // Màu chữ tối hơn cho dễ đọc
      textAlign: 'center',
      flex: 1,
    },
    backButton: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
    },
    paymentMethod: {
      backgroundColor: '#E3E7EA', // Màu xám nhạt cho phần phương thức thanh toán
      padding: 10,
      borderRadius: 10,
      marginBottom: 20,
    },
    label: {
      color: '#555555', // Màu chữ trung tính
      marginBottom: 10,
    },
    iconsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    paymentIcon: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
    inputContainer: {
      marginBottom: 20,
    },
    inputLabel: {
      color: '#333333', // Màu tối cho nhãn
      marginBottom: 5,
    },
    input: {
      backgroundColor: '#F9F9F9', // Màu nền sáng cho input
      color: '#333333', // Màu chữ tối
      padding: 10,
      borderRadius: 5,
      borderColor: '#CCCCCC', // Viền nhẹ
      borderWidth: 1,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    rowItem: {
      width: '48%',
    },
    button: {
      backgroundColor: '#007BFF', // Màu xanh dương nổi bật cho nút
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFFFFF', // Chữ trắng để tương phản với nền xanh
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  export default PaymentScreen;
