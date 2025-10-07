import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'

const searchBar = () => {
  return (
    <View className='flex-row items-end justify-end bg-gray-200 rounded-full px-7 py-1'>
      <Ionicons name='search' size={20} color='#ff0000' />
    </View>
  )
}

export default searchBar

