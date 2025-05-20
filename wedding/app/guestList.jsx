import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

const GuestList = () => {
  const [guestName, setGuestName] = useState('');
  const [guests, setGuests] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');

  const addGuest = () => {
    if (guestName.trim() === '') return;
    setGuests((prev) => [
      ...prev,
      { id: Date.now().toString(), name: guestName },
    ]);
    setGuestName('');
  };

  const removeGuest = (id) => {
    setGuests((prev) => prev.filter((guest) => guest.id !== id));
  };

  const startEdit = (guest) => {
    setEditingId(guest.id);
    setEditedName(guest.name);
  };

  const saveEdit = (id) => {
    setGuests((prev) =>
      prev.map((guest) =>
        guest.id === id ? { ...guest, name: editedName } : guest
      )
    );
    setEditingId(null);
    setEditedName('');
  };

  return (
     <ImageBackground
          source={require('../assets/images/background.jpg')} // Replace with your image path
          style={styles.background}
        >
    <View style={styles.container}>
      <Text style={styles.title}>Guest List</Text>
      <Text style={styles.count}>Total Guests: {guests.length}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter guest name"
        value={guestName}
        onChangeText={setGuestName}
      />

      <Button title="Add Guest" onPress={addGuest} />

      <FlatList
        data={guests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.guestItem}>
            {editingId === item.id ? (
              <>
                <TextInput
                  style={styles.editInput}
                  value={editedName}
                  onChangeText={setEditedName}
                />
                <TouchableOpacity onPress={() => saveEdit(item.id)}>
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text>{item.name}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => startEdit(item)}>
                    <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeGuest(item.id)}>
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
        style={styles.list}
      />
    </View>
    </ImageBackground>
  );
};

export default GuestList;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
  container: {
    flex: 1,
    width: '80%',
    minHeight: 200,
    maxHeight: 600,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  count: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 48,
  },
  list: {
    marginTop: 16,
  },
  guestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  removeText: {
    color: 'red',
    marginLeft: 10,
  },
  editText: {
    color: 'blue',
  },
  saveText: {
    color: 'green',
  },
  editInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    marginRight: 10,
  },
});
