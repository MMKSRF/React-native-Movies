import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router'; 

import SearchBar from '../../components/searchBar';
import "../global.css";

const Index = () => {

  const router = useRouter();

  return (
    <View className='flex-1 bg-[#ffffff] '>
        <ScrollView className='flex-1 px-5  bg-gray-800'
        showsVerticalScrollIndicator={false} contentContainerStyle={{
            minHeight: '100%',
            paddingBottom: 10
        }}>

            <Ionicons name="american-football" size={30} color="#ff0000" className='w- h-10 mt-20 mb-5 mx-auto' />
             <View className='w-full bg-red-00 rounded-lg mx-auto justify-center items-center mb-10'>
                <SearchBar 
                onPress={() => router.push("/search")}
                placeholder={"Search movies..."}
                />

             </View>
        </ScrollView>

    </View>
  )
}

export default Index

// const styles = StyleSheet.create({}) 




// api key 
// 