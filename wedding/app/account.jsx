import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity,ImageBackground } from 'react-native';

const Account = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState(''); // e.g., Groom, Bride, Planner, Guest
  const [accounts, setAccounts] = useState([]);

  const addAccount = () => {
    if (!name || !email || !phone || !role) return;

    const newAccount = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      role
    };

    setAccounts(prev => [...prev, newAccount]);
    setName('');
    setEmail('');
    setPhone('');
    setRole('');
  };

  const removeAccount = (id) => {
    setAccounts(prev => prev.filter(acc => acc.id !== id));
  };

  return (
      <ImageBackground
                  source={require('../assets/images/background.jpg')} // Replace with your image path
                  style={styles.background}
                >
    <View style={styles.container}>
      <Text style={styles.title}>Add User Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Role (e.g., Bride, Groom, Planner)"
        value={role}
        onChangeText={setRole}
      />
      <Button title="Add Account" onPress={addAccount} />

      <FlatList
        data={accounts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.accountRow}>
            <Text>{item.name} ({item.role}) - {item.phone}</Text>
            <TouchableOpacity onPress={() => removeAccount(item.id)}>
              <Text style={styles.remove}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
    </ImageBackground>
  );
};

export default Account;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
  container: { flex: 0.3, padding: 20, backgroundColor: '#fff',width: '85%',marginTop: 20,marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 6,
    paddingHorizontal: 10, marginBottom: 10, height: 45
  },
  accountRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee'
  },
  remove: { color: 'red' }
});
