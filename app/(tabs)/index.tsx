import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import SearchBar from '../../components/searchBar';
import "../global.css";

const index = () => {
  return (
    <View className='flex-1 bg-[#ffffff] '>
        <ScrollView className='flex-1 px-5 bg-gray-800'
        showsVerticalScrollIndicator={false} contentContainerStyle={{
            minHeight: '100%',
            paddingBottom: 10
        }}>

            <Ionicons name="american-football" size={30} color="#ff0000" className='w-12 h-10 mt-20 mb-5 mx-auto' />
             <View className='w-40 h-10 bg-red-00 rounded-lg mx-auto justify-center items-center mb-10'>
                <SearchBar />
             </View>
        </ScrollView>

    </View>
  )
}

export default index

const styles = StyleSheet.create({})