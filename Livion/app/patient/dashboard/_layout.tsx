import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import BottomNavbar from '../../../components/organisms/BottomNavbarPatient';

export default function PatientLayout() {
  return (
    // Folosim o singură View pentru a conține atât paginile (Stack), cât și Navbar-ul
    <View style={{ flex: 1 }}>
      
      {/* 1. Stack-ul afișează conținutul paginilor (home.tsx, careplan.tsx) */}
      <Stack screenOptions={{ headerShown: false }} /> 
      {/* Dacă vreți să afișați header-ul, scoateți screenOptions. */}

      {/* 2. Navbar-ul, care rămâne fix deasupra Stack-ului */}
      <BottomNavbar />
    </View>
  );
}