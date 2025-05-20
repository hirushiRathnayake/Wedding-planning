import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const navigation = useNavigation();

  const menuItems = [
    { title: '👥 Guest List', screen: 'GuestList' },
    { title: '💰 Budget Planner', screen: 'Budget' },
    { title: '🤵 Groom\'s Details', screen: 'Groom' },
    { title: '👰 Bride\'s Details', screen: 'Bride' },
    { title: '📇 User Accounts', screen: 'Account' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Wedding Planner Dashboard</Text>

      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => navigation.navigate(item.screen)}
        >
          <Text style={styles.cardText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    flexGrow: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    width: '100%',
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
    alignItems: 'center'
  },
  cardText: {
    fontSize: 18,
    fontWeight: '500'
  }
});
