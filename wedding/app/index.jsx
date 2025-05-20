import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
        <Link href="/groom">Groom</Link>
        <Link href="/guestList">GuestList</Link>
        <Link href="/bride">Bride</Link>
        <Link href="/budget">Budget</Link>
        <Link href="/account">Account</Link>
        <Link href="/dashboard">Dashboard</Link>
     
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})