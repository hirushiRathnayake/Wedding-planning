import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity,ImageBackground } from 'react-native';

const Budget = () => {
  const [totalBudget, setTotalBudget] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemCost, setItemCost] = useState('');
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (!itemName || !itemCost || isNaN(itemCost)) return;

    const newItem = {
      id: Date.now().toString(),
      name: itemName,
      cost: parseFloat(itemCost),
    };

    setItems(prev => [...prev, newItem]);
    setItemName('');
    setItemCost('');
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotalSpent = () => {
    return items.reduce((sum, item) => sum + item.cost, 0);
  };

  const getRemaining = () => {
    const budget = parseFloat(totalBudget);
    return isNaN(budget) ? 0 : budget - getTotalSpent();
  };

  return (
     <ImageBackground
                  source={require('../assets/images/background.jpg')} // Replace with your image path
                  style={styles.background}
                >
    <View style={styles.container}>
      <Text style={styles.title}>Wedding Budget Planner</Text>

      <TextInput
        style={styles.input}
        placeholder="Total Budget"
        keyboardType="numeric"
        value={totalBudget}
        onChangeText={setTotalBudget}
      />

      <View style={styles.budgetRow}>
        <Text style={styles.label}>Spent: ${getTotalSpent().toFixed(2)}</Text>
        <Text style={styles.label}>Remaining: ${getRemaining().toFixed(2)}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Item Name (e.g. Venue)"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Cost"
        keyboardType="numeric"
        value={itemCost}
        onChangeText={setItemCost}
      />
      <Button title="Add Item" onPress={addItem} />

      <FlatList
        style={styles.list}
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text>{item.name}: ${item.cost.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
    </ImageBackground>
  );
};

export default Budget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 20,
    width: '85%',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 48,
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  list: {
    marginTop: 20,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  removeText: {
    color: 'red',
  },
});
