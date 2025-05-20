import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,ImageBackground } from 'react-native';
import { Link } from 'expo-router';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'user@example.com' && password === 'password') {
      navigation.navigate('Dashboard');
    } else {
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/login.jpg')} // Replace with your image path
      style={styles.background}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Wedding Planner Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Text
              style={styles.loginLink}
            >
             If you don't have any account? <Link href={'/register'} style={{color:'blue'}}>SignUp</Link>
            </Text>
    </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
  container: {
    flex: 0.4,
    justifyContent: 'center',
    borderRadius: 10,
    padding: 24,
    backgroundColor: '#fff',
    width: '90%',
    minHeight: 300,
    maxHeight: 350,
  },
  title: {
    fontSize: 26,
    marginBottom: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  loginLink: {
    marginTop: 16,
    color: 'black',
    textAlign: 'center',
  },
});
