import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const MovieDetails = () => {
    const {id } = useLocalSearchParams()
    console.log(id)
  return (
    <View>
      <Text>{id}</Text>
    </View>
  )
}

export default MovieDetails

const styles = StyleSheet.create({})