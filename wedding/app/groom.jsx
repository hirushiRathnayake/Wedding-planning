import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, FlatList,
  StyleSheet, TouchableOpacity, ScrollView,ImageBackground
} from 'react-native';

const Groom = () => {
  const [activeTab, setActiveTab] = useState('donations'); // tabs: 'donations', 'expenses', 'needs'

  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenses, setExpenses] = useState([]);

  const [donorName, setDonorName] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [donations, setDonations] = useState([]);

  const [need, setNeed] = useState('');
  const [needs, setNeeds] = useState([]);

  const [editingItem, setEditingItem] = useState(null);

  const handleEdit = (item, type) => {
    setEditingItem({ ...item, type });
    if (type === 'donation') {
      setDonorName(item.name);
      setDonationAmount(item.amount.toString());
    } else if (type === 'expense') {
      setExpenseName(item.name);
      setExpenseAmount(item.amount.toString());
    } else {
      setNeed(item.text);
    }
  };

  const updateItem = () => {
    if (!editingItem) return;

    const { id, type } = editingItem;

    if (type === 'donation' && donorName && !isNaN(donationAmount)) {
      setDonations(prev => prev.map(item => item.id === id ? { ...item, name: donorName, amount: parseFloat(donationAmount) } : item));
      setDonorName('');
      setDonationAmount('');
    } else if (type === 'expense' && expenseName && !isNaN(expenseAmount)) {
      setExpenses(prev => prev.map(item => item.id === id ? { ...item, name: expenseName, amount: parseFloat(expenseAmount) } : item));
      setExpenseName('');
      setExpenseAmount('');
    } else if (type === 'need' && need.trim()) {
      setNeeds(prev => prev.map(item => item.id === id ? { ...item, text: need } : item));
      setNeed('');
    }

    setEditingItem(null);
  };

  const addDonation = () => {
    if (!donorName || isNaN(donationAmount)) return;
    setDonations(prev => [...prev, { id: Date.now().toString(), name: donorName, amount: parseFloat(donationAmount) }]);
    setDonorName('');
    setDonationAmount('');
  };

  const addExpense = () => {
    if (!expenseName || isNaN(expenseAmount)) return;
    setExpenses(prev => [...prev, { id: Date.now().toString(), name: expenseName, amount: parseFloat(expenseAmount) }]);
    setExpenseName('');
    setExpenseAmount('');
  };

  const addNeed = () => {
    if (!need.trim()) return;
    setNeeds(prev => [...prev, { id: Date.now().toString(), text: need }]);
    setNeed('');
  };

  const removeItem = (list, setList, id) => {
    setList(prev => prev.filter(item => item.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalReceived = donations.reduce((sum, d) => sum + d.amount, 0);
  const balance = totalReceived - totalExpenses;

  return (
    <ImageBackground
              source={require('../assets/images/background.jpg')} // Replace with your image path
              style={styles.background}
            >
    <View style={styles.container}>
      <Text style={styles.title}>Groom's Wedding Manager</Text>

      {/* Tab Buttons */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab('donations')} style={[styles.tabBtn, activeTab === 'donations' && styles.activeTab]}>
          <Text style={styles.tabText}>Donations</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('expenses')} style={[styles.tabBtn, activeTab === 'expenses' && styles.activeTab]}>
          <Text style={styles.tabText}>Expenses</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('needs')} style={[styles.tabBtn, activeTab === 'needs' && styles.activeTab]}>
          <Text style={styles.tabText}>Needs</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'donations' && (
        <>
          <Text style={styles.section}>💵 Money Received from Guests</Text>
          <TextInput style={styles.input} placeholder="Donor Name" value={donorName} onChangeText={setDonorName} />
          <TextInput style={styles.input} placeholder="Amount" keyboardType="numeric" value={donationAmount} onChangeText={setDonationAmount} />
          <Button title={editingItem?.type === 'donation' ? 'Update Donation' : 'Add Donation'} onPress={editingItem ? updateItem : addDonation} />
          <FlatList
            data={donations}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <Text>{item.name}: ${item.amount.toFixed(2)}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => handleEdit(item, 'donation')}>
                    <Text style={styles.edit}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeItem(donations, setDonations, item.id)}>
                    <Text style={styles.remove}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </>
      )}

      {activeTab === 'expenses' && (
        <>
          <Text style={styles.section}>💳 Groom’s Expenses</Text>
          <TextInput style={styles.input} placeholder="Expense Name" value={expenseName} onChangeText={setExpenseName} />
          <TextInput style={styles.input} placeholder="Amount" keyboardType="numeric" value={expenseAmount} onChangeText={setExpenseAmount} />
          <Button title={editingItem?.type === 'expense' ? 'Update Expense' : 'Add Expense'} onPress={editingItem ? updateItem : addExpense} />
          <FlatList
            data={expenses}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <Text>{item.name}: ${item.amount.toFixed(2)}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => handleEdit(item, 'expense')}>
                    <Text style={styles.edit}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeItem(expenses, setExpenses, item.id)}>
                    <Text style={styles.remove}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </>
      )}

      {activeTab === 'needs' && (
        <>
          <Text style={styles.section}>📝 Groom's Needs</Text>
          <TextInput style={styles.input} placeholder="e.g. Suit, Shoes, Watch" value={need} onChangeText={setNeed} />
          <Button title={editingItem?.type === 'need' ? 'Update Need' : 'Add Need'} onPress={editingItem ? updateItem : addNeed} />
          <FlatList
            data={needs}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <Text>{item.text}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => handleEdit(item, 'need')}>
                    <Text style={styles.edit}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeItem(needs, setNeeds, item.id)}>
                    <Text style={styles.remove}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </>
      )}

      <Text style={styles.summary}>💰 Total Received: ${totalReceived.toFixed(2)}</Text>
      <Text style={styles.summary}>💸 Total Expenses: ${totalExpenses.toFixed(2)}</Text>
      <Text style={styles.summary}>🧾 Balance: ${balance.toFixed(2)}</Text>
    </View>
    </ImageBackground>
  );
};

export default Groom;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
  container: { flex: 1, padding: 20, backgroundColor: '#fff',width: '85%',marginTop: 20,marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  section: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 6,
    paddingHorizontal: 10, marginBottom: 10, height: 45,
  },
  itemRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee',
  },
  actions: { flexDirection: 'row', gap: 10 },
  remove: { color: 'red', marginLeft: 10 },
  edit: { color: 'blue', marginRight: 10 },
  summary: {
    marginTop: 10, fontWeight: 'bold', fontSize: 16,
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row', justifyContent: 'space-around',
    marginBottom: 10,
  },
  tabBtn: {
    padding: 10, backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#cce5ff',
  },
  tabText: {
    fontWeight: 'bold',
  }
});
