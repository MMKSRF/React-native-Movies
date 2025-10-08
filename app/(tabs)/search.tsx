import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/searchBar';
import { fetchMovies } from '@/services/api';
import { updateSearchCount } from '@/services/appwrite';
import useFetch from '@/services/useFecth';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Search = () => {
  const { data: movies, loading: moviesLoading, error: moviesError, refetch: loadMovies, reset } = useFetch(() => fetchMovies({ query: searchQuery }), false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchSuggestions = [
    'Action', 'Comedy', 'Drama', 'Horror', 
    'Sci-Fi', 'Romance', 'Thriller', 'Adventure'
  ];

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
      console.log('Searching for:', searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    if (movies?.length > 0 && movies?.[0]) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);

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
        <View className='px-6 pt-20 pb-3 items-center border-b border-gray-700'>
          <View className='flex-row items-center'>
            <Text className='text-white text-xl font-bold mr-2'>Cine</Text>
            <View className='bg-red-600 px-2 py-1 rounded'>
              <Text className='text-white text-xl font-bold'>Max</Text>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View className='px-6 mt-6'>
          <View className='w-full'>
            {/* Search Bar */}
            <View className='mb-10'>
              <SearchBar 
                placeholder='Try "Action", "Comedy" or "Drama"' 
                value={searchQuery} 
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {/* Search Suggestions */}
            {!searchQuery.trim() && !moviesLoading && (
              <View className="px-4 mb-6">
                <Text className="text-gray-400 text-sm mb-3 text-center">
                  Popular searches
                </Text>
                <View className="flex-row flex-wrap justify-center">
                  {searchSuggestions.map((term, index) => (
                    <TouchableOpacity
                      key={index}
                      className="bg-gray-700 px-4 py-2 rounded-full mr-2 mb-2"
                      onPress={() => setSearchQuery(term)}
                    >
                      <Text className="text-white text-sm">{term}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Loading State */}
            {moviesLoading && (
              <View className="items-center py-4">
                <ActivityIndicator size="large" color="#dc2626" />
                <Text className="text-gray-400 text-sm mt-2">Searching for {searchQuery}...</Text>
              </View>
            )}

            {/* Error State */}
            {moviesError && (
              <View className="items-center px-6 py-4">
                <Ionicons name="warning-outline" size={32} color="#ef4444" />
                <Text className='text-white text-lg text-center mt-2'>
                  Error: {moviesError?.message}
                </Text>
              </View>
            )}

            {/* Empty State */}
            {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length === 0 && (
              <View className="items-center justify-center mt-10 px-6">
                <Ionicons name="search-outline" size={48} color="#6b7280" />
                <Text className='text-white text-lg text-center mt-4'>
                  No results found for <Text className='text-red-500'>{searchQuery}</Text>
                </Text>
                <Text className="text-gray-400 text-center mt-2">
                  Try different keywords or check the spelling
                </Text>
              </View>
            )}

            {/* Results Section */}
            {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
              <View className='mb-8'>
                <View className="flex-row justify-between items-center mb-6">
                  <Text className='text-xl text-white font-bold'>
                    Results for <Text className='text-red-500'>{searchQuery}</Text>
                  </Text>
                  <Text className="text-gray-400 text-sm">
                    {movies.length} {movies.length === 1 ? 'movie' : 'movies'} found
                  </Text>
                </View>

                <FlatList
                  data={movies}
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
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Search;