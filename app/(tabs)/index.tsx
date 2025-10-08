import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native';

import MovieCard from '../../components/MovieCard';
import SearchBar from '../../components/searchBar';
import { fetchMovies } from '../../services/api';
import useFetch from '../../services/useFecth';

import TrendingCard from '@/components/TrendingCard';
import { getTrendingMovies } from '@/services/appwrite';
import "../global.css";

const Index = () => {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError
  } = useFetch(getTrendingMovies);

  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({ query: '' }));

  return (
    <View className='flex-1 bg-gray-900'>
      <ScrollView 
        className='flex-1'
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{
          paddingBottom: 40
        }}
      >
        {/* Header Section */}
        <View className='px-6 pt-20 pb-3  items-center border-b border-gray-700'>
          <View className='flex-row items-center'>
            <Text className='text-white text-xl font-bold mr-2'>Cine</Text>
            <View className='bg-red-600 px-2 py-1 rounded'>
              <Text className='text-white text-xl font-bold'>Max</Text>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View className='px-6 mt-6'>
          {moviesLoading || trendingLoading ? (
            <View className='flex-1 justify-center items-center py-20'>
              <ActivityIndicator size="large" color="#dc2626" />
              <Text className='text-gray-400 text-lg mt-4 font-light'>Loading cinema magic...</Text>
            </View>
          ) : moviesError || trendingError ? (
            <View className='flex-1 justify-center items-center py-20'>
              <Ionicons name="warning-outline" size={48} color="#ef4444" />
              <Text className='text-white text-lg text-center mt-4 font-medium'>
                Error: {moviesError?.message || trendingError?.message}
              </Text>
            </View>
          ) : (
            <View className='w-full'>
              {/* Search Bar */}
              <View className='mb-10'>
                <SearchBar 
                  onPress={() => router.push("/search")}
                  placeholder={"Search movies..."}
                />
              </View>

              {/* Trending Movies Section */}
              {trendingMovies && trendingMovies.length > 0 && (
                <View className='mb-12'>
                  <View className='flex-row justify-between items-center mb-6'>
                    <Text className='text-white text-2xl font-semibold tracking-tight'>
                      Trending Now
                    </Text>
                    <View className='flex-row items-center'>
                      <Text className='text-gray-400 text-sm mr-2'>This Week</Text>
                      <Ionicons name="flame" size={16} color="#dc2626" />
                    </View>
                  </View>
                  
                  <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View className='w-4'/>}
                    data={trendingMovies}
                    renderItem={({ item, index }) => (
                      <TrendingCard movie={item} index={index} /> 
                    )}
                    keyExtractor={(item) => item.movie_id.toString()}
                  />
                </View>
              )}

              {/* Latest Movies Section */}
              <View>
                <View className='flex-row justify-between items-center mb-6'>
                  <Text className='text-white text-2xl font-semibold tracking-tight'>
                    Latest Releases
                  </Text>
                  <View className='flex-row items-center'>
                    <Text className='text-gray-400 text-sm mr-2'>New</Text>
                    <Ionicons name="time" size={16} color="#3b82f6" />
                  </View>
                </View>

                <FlatList
                  data={movies || trendingMovies}
                  renderItem={({ item }) => (
                    <MovieCard {...item} />
                  )}
                  keyExtractor={item => item.id.toString()}
                  numColumns={3}
                  columnWrapperStyle={{ 
                    justifyContent: 'space-between',
                    gap: 12,
                    marginBottom: 16,
                  }}
                  scrollEnabled={false}
                  contentContainerStyle={{ paddingBottom: 20 }}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default Index;