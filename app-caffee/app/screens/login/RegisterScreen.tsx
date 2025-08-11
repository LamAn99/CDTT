import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [mobileNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState({
    street: "",
    buildingName: "",
    city: "",
    state: "",
    country: "",
    pincode: ""
  });
  const handleSignUp = async () => {
    try {
      const payload = {
        userId: 0,
        firstName,
        lastName,
        mobileNumber,
        email,
        password,
        roles: [
          {
            roleId: 101,
            roleName: "ADMIN"
          }
        ],
        address: {
          addressId: 0,
          ...address
        }
      };
      console.log("formData", payload);
      const response = await axios.post(
        "http://10.18.6.195:8080/api/register",
        { payload },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("response", response)

      if (response) {
        Alert.alert('Success', 'User registered successfully!');
        navigation.navigate("login");
      } else {
        Alert.alert('Error', 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Đăng ký</Text>
        <Text style={styles.greeting}>
          Chúng tôi rất vui mừng khi bạn đã sẵn sàng trở thành một phần trong mạng lưới cà phê của chúng tôi! Đừng quên xem quyền lợi của bạn!
        </Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Số điện thoại"
          style={styles.input}
          placeholderTextColor="#ccc"
          value={mobileNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          placeholder="Họ"
          style={styles.input}
          placeholderTextColor="#ccc"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholder="Tên"
          style={styles.input}
          placeholderTextColor="#ccc"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          placeholder="Mật khẩu"
          style={styles.input}
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signUpText} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signUpText}>
            Bạn đã có tài khoản?<Text style={styles.loginTextContent}> Đăng nhập</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#282c34' },
  background: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#A58446' },
  logo: { width: 100, height: 100, marginBottom: 20 },
  formContainer: { flex: 4, backgroundColor: '#f0f0f0', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  title: { fontSize: 32, color: '#A58446', marginBottom: 10, textAlign: "center" },
  greeting: { fontSize: 16, color: '#555', marginBottom: 20, textAlign: "center" },
  input: { width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 5, paddingHorizontal: 10, marginBottom: 15 },
  button: { width: '100%', height: 50, backgroundColor: '#A58446', borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#fff', fontSize: 18 },
  signUpText: { flexDirection: 'row', justifyContent: 'center', color: 'black', textAlign: "center", marginBottom: 20 },
  loginTextContent: { color: '#A58446', fontWeight: 'bold', textAlign: "center" },
  errorMessage: { color: 'red', marginTop: 10, textAlign: "center" },
});
