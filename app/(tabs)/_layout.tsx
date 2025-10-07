import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0f0f0f',
          borderTopColor: '#333',
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#e50914',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            // console.log ("COLOR ", co)
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }} 
      />
      
      <Tabs.Screen 
        name="search" 
        options={{
          title: "Search",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.searchButton, { marginBottom: focused ? 30 : -18 }]} >
              <Ionicons 
                name={focused ? "search" : "search-outline"} 
                size={size} 
                color="#fff" 
               
              />
            </View>
          ),
          tabBarLabel: () => null,
        }} 
      />
      
      <Tabs.Screen 
        name="saved" 
        options={{
          title: "Saved",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "bookmark" : "bookmark-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }} 
      />
      
      <Tabs.Screen 
        name="profile" 
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }} 
      />
    </Tabs>
  );
};



const styles = StyleSheet.create({
  searchButton: {
    backgroundColor: '#e50914',
    width: 100,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#e50914',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default TabLayout;