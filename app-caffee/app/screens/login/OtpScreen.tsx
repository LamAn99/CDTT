import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

type RootStackParamList = {
    Login: undefined;
    Otp: { username: string };
    Home: undefined;
};

type OtpScreenRouteProp = RouteProp<RootStackParamList, 'Otp'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Otp'>;

const OtpScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<OtpScreenRouteProp>();
    const { username } = route.params;

    const [inputOtp, setInputOtp] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [generatedOtp, setGeneratedOtp] = useState<string>('');

    useEffect(() => {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOtp(otp);
    }, []);

    const handleVerifyOtp = () => {
        if (inputOtp === generatedOtp) {
            Alert.alert('Thành công', 'Đăng nhập thành công!');
            navigation.navigate('Home');
        } else {
            setErrorMessage('OTP không đúng. Vui lòng thử lại.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Xác thực OTP</Text>
                <Text style={styles.greeting}>
                    Xin chào {username}, vui lòng nhập mã OTP đã được gửi.
                </Text>

                {/* Hiển thị OTP để test */}
                <Text style={styles.testOtp}>Mã OTP: {generatedOtp}</Text>

                <TextInput
                    placeholder="Nhập mã OTP"
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    value={inputOtp}
                    onChangeText={setInputOtp}
                    keyboardType="numeric"
                />

                <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
                    <Text style={styles.buttonText}>Xác nhận</Text>
                </TouchableOpacity>

                {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#282c34', justifyContent: 'center' },
    formContainer: { backgroundColor: '#f0f0f0', margin: 20, padding: 20, borderRadius: 10 },
    title: { fontSize: 24, color: '#A58446', marginBottom: 10, textAlign: 'center' },
    greeting: { fontSize: 16, color: '#555', marginBottom: 20, textAlign: 'center' },
    input: { width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 5, paddingHorizontal: 10, marginBottom: 15 },
    button: { width: '100%', height: 50, backgroundColor: '#A58446', borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    buttonText: { color: '#fff', fontSize: 18 },
    errorMessage: { color: 'red', marginTop: 10, textAlign: 'center' },
    testOtp: { color: 'green', fontSize: 16, marginBottom: 10, textAlign: 'center' }, // OTP hiển thị test
});

export default OtpScreen;
