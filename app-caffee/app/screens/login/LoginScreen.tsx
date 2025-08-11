import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignInScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isValidEmailOrPhone = (input) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPhone = /^[0-9]{10,15}$/;
    return regexEmail.test(input) || regexPhone.test(input);
  };

  const handleLogin = async () => {
    if (!isValidEmailOrPhone(username)) {
      setErrorMessage("Email hoặc số điện thoại không hợp lệ. Vui lòng nhập lại.");
      return;
    }

    try {
      const response = await axios.post(
        "http://10.18.6.195:8080/api/login",
        { email: username, password: password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      const token = response.data["jwt-token"];
      if (token) {
        localStorage.setItem("jwt-token", token);
        localStorage.setItem("username", username);

        console.log("Đăng nhập thành công");
        navigation.navigate("Home");
      } else {
        setErrorMessage("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      setErrorMessage("Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Đăng nhập</Text>
        <Text style={styles.greeting}>Xin chào! Hãy đăng nhập để tiếp tục.</Text>

        <TextInput
          placeholder="Email hoặc số điện thoại"
          style={styles.input}
          placeholderTextColor="#ccc"
          value={username}
          onChangeText={setUsername}
        />
        {/* <TextInput
          placeholder="Họ tên"
          style={styles.input}
          placeholderTextColor="#ccc"
          value={fullname}
          onChangeText={setFullname}
        /> */}
        <TextInput
          placeholder="Mật khẩu"
          style={styles.input}
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUpText}
          onPress={() => navigation.navigate("Register")}
        >
          <Text>
            Bạn chưa có tài khoản? <Text style={styles.loginTextContent}>Đăng ký</Text>
          </Text>
        </TouchableOpacity>

        {/* New "Change Password" Link */}
        <TouchableOpacity
          style={styles.changePasswordText}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Text style={styles.changePasswordLinkText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#A58446',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  formContainer: {
    flex: 4,
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 32,
    color: '#A58446',
    marginBottom: 10,
    textAlign: "center",
  },
  greeting: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#A58446',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  signUpText: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: "center",
    marginBottom: 20,
  },
  loginTextContent: {
    color: '#A58446',
    fontWeight: 'bold',
    textAlign: "center",
  },
  changePasswordText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  changePasswordLinkText: {
    color: '#A58446',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
    textAlign: "center",
  },
});

export default SignInScreen;
