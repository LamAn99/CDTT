import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      {/* Nút mũi tên trở lại */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome5 name="arrow-left" size={24} />
      </TouchableOpacity>

      {/* Phần header của profile */}
      <View style={styles.profileHeader}>
        <Image
          source={require('../../assets/images/avata.png')} // Thay bằng đường dẫn hình ảnh của bạn
          style={styles.profileImage}
        />
        <Text style={styles.userName}>An Coffee Shop</Text>
        <FontAwesome5 name="edit" size={24} color="black" style={styles.icon} />
      </View>

      <Text style={styles.settingsTitle}>Settings</Text>

      {/* Số điện thoại */}
      <View style={styles.settingItem}>
        <FontAwesome5 name="phone" size={24} color="black" style={styles.icon} />
        <Text style={styles.settingText}>+380483746375</Text>
        <TouchableOpacity>
          <FontAwesome5 name="edit" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Địa chỉ */}
      <View style={styles.settingItem}>
        <FontAwesome5 name="map-marker-alt" size={24} color="black" style={styles.icon} />
        <Text style={styles.settingText}>Quận 12, TP.HCM</Text>
        <TouchableOpacity>
          <FontAwesome5 name="edit" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* My Cart */}
      <View style={styles.settingItem}>
        <FontAwesome5 name="shopping-cart" size={24} color="black" style={styles.icon} />
        <Text style={styles.settingText}>My Cart</Text>
        <TouchableOpacity>
          <FontAwesome5 name="edit" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5DC',
  },
  backButton: {
    position: 'absolute',
    top: 10, // Khoảng cách từ trên cùng màn hình
    left: 10, // Khoảng cách từ bên trái
    zIndex: 1, // Đảm bảo nút hiển thị trên cùng
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 50, // Tạo khoảng cách phía trên để tránh bị che bởi mũi tên
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  editText: {
    color: '#FFA500', // Màu cam
    marginTop: 5,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    marginRight: 10, // Giảm khoảng cách giữa biểu tượng và văn bản
  },
  settingText: {
    flex: 1, // Điều chỉnh để văn bản có khoảng cách thích hợp
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFA500', // Màu cam
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
