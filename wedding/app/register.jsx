import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,ImageBackground } from 'react-native';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    // Simulated success - you can replace this with Firebase or backend call
    Alert.alert('Success', 'Account created!');
    navigation.navigate('Login');
  };

  return (
      <ImageBackground
          source={require('../assets/images/login.jpg')} // Replace with your image path
          style={styles.background}
        >
    <View style={styles.container}>
      <Text style={styles.title}>Register for Wedding Planner</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Button title="Register" onPress={handleRegister} />
      <Text
        style={styles.loginLink}
      >
        Already have an account? <Link href={'/login'} style={{color:'blue'}}>Login</Link>
      </Text>
    </View>
    </ImageBackground>
  );
};

export default Register;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
  container: {
    flex: 0.5,
    justifyContent: 'center',
    padding: 14,
    backgroundColor: '#fff',
    width: '90%',
    minHeight: 300,
    maxHeight: 450,
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
