import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, TextInput } from 'react-native';


interface props{
  onPress?: () => void,
  placeholder: string
}

const SearchBar = ({ onPress, placeholder }:props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Add your search/filter logic here later
    console.log('Search query:', query);
  };

  return (
    <View className='flex-row items-center bg-[#1f1f1f] rounded-full px-4  py-3 mx-5 my-2 flex-1 opacity-80'>
      <Ionicons name='search' size={20} color='#9CA3AF' />
      <TextInput
        className='flex-1 ml-2 text-base'
        placeholder={placeholder || 'Search...'}
        placeholderTextColor='#9CA3AF'
        value={searchQuery}
        onPress={onPress}
        onChangeText={handleSearch}
        clearButtonMode='while-editing' // Adds a clear button on iOS
      />
    </View>
  );
};

export default SearchBar;