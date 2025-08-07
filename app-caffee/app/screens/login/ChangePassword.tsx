import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context'; // If using safe area

const ChangePasswordScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Mật khẩu mới không khớp. Vui lòng nhập lại.");
      return;
    }

    try {
      const token = localStorage.getItem("jwt-token");

      const response = await axios.post(
        "http://172.16.80.15:8080/api/ChangePassword",
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Mật khẩu đã được thay đổi thành công.");
        setErrorMessage("");
      } else {
        setErrorMessage("Đổi mật khẩu thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Đổi mật khẩu thất bại:", error);
      setErrorMessage("Đổi mật khẩu thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Đổi mật khẩu</Text>

        <TextInput
          placeholder="Mật khẩu hiện tại"
          style={styles.input}
          placeholderTextColor="#ccc"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Mật khẩu mới"
          style={styles.input}
          placeholderTextColor="#ccc"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Xác nhận mật khẩu mới"
          style={styles.input}
          placeholderTextColor="#ccc"
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>

        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    color: '#A58446',
    marginBottom: 20,
    textAlign: 'center',
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
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  successMessage: {
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ChangePasswordScreen;
