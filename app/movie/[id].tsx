import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  Share,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { fetchMovieById } from '../../services/api';


const MovieDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Animation values (persist between renders)

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const getMovie = async () => {
      try {
        if (!id) throw new Error('No movie ID provided');
        const result = await fetchMovieById(id);
        setMovie(result);
        
        // Start fade animation when movie loads
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      } catch (err: any) {
        setError(err.message || 'Failed to fetch movie');
      } finally {
        setLoading(false);
      }
    };

    getMovie();
  }, [id]);








  const shareMovie = async () => {
    try {
      if (!movie) return;
      await Share.share({
        message: `Check out "${movie.title}" - ${movie.overview?.substring(0, 100)}...`,
        url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    } catch (error) {
      console.error('Error sharing movie:', error);
    }
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getYear = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900">
        <ActivityIndicator size="large" color="#ff0000" />
        <Text className="text-white mt-4 text-lg">Loading movie magic...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900">
        <Ionicons name="sad-outline" size={64} color="#ff6b6b" />
        <Text className="text-white text-xl mt-4 text-center mx-8">{error}</Text>
        <TouchableOpacity className="bg-red-600 px-6 py-3 rounded-full mt-6">
          <Text className="text-white font-semibold">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-900">
      {/* Animated Header */}
    
      <Animated.ScrollView>
        <View className="px-6 pb-44 flex-1 justify-center items-center h-screen w-screen mt-24">
          {/* Main Content Card */}
          <View className="bg-gray-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* Poster and Basic Info */}
            <View className="flex-row p-6 -mt-24">
              <View className="relative">
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                  className="w-32 h-48 rounded-2xl shadow-2xl"
                />
                <View className="absolute -top-2 -right-2 bg-yellow-500 px-2 py-1 rounded-full">
                  <Text className="text-black font-bold text-xs">
                    {movie.vote_average?.toFixed(1)} ★
                  </Text>
                </View>
              </View>
              
              <View className="flex-1 ml-6 justify-between py-2">
                <View>
                  <Text className="text-white text-2xl font-bold leading-tight">
                    {movie.title}
                  </Text>
                  <Text className="text-gray-400 text-base mt-1">
                    {getYear(movie.release_date)} • {movie.original_language?.toUpperCase()}
                  </Text>
                </View>
                
                {movie.runtime && (
                  <Text className="text-gray-300 font-semibold">
                    {formatRuntime(movie.runtime)}
                  </Text>
                )}
              </View>
            </View>

            {/* Action Buttons */}
            <View className="flex-row justify-between px-6 pb-6">
              <TouchableOpacity className="items-center">
                <View className="bg-gray-700 p-3 rounded-full">
                  <Ionicons name="heart-outline" size={24} color="#ef4444" />
                </View>
                <Text className="text-gray-400 text-xs mt-1">Favorite</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="items-center">
                <View className="bg-gray-700 p-3 rounded-full">
                  <Ionicons name="bookmark-outline" size={24} color="#3b82f6" />
                </View>
                <Text className="text-gray-400 text-xs mt-1">Watchlist</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="items-center" onPress={shareMovie}>
                <View className="bg-gray-700 p-3 rounded-full">
                  <Ionicons name="share-social-outline" size={24} color="#10b981" />
                </View>
                <Text className="text-gray-400 text-xs mt-1">Share</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="items-center">
                <View className="bg-red-600 p-3 rounded-full">
                  <Ionicons name="play" size={24} color="white" />
                </View>
                <Text className="text-gray-400 text-xs mt-1">Trailer</Text>
              </TouchableOpacity>
            </View>

            {/* Overview */}
            <View className="px-6 pb-8">
              <Text className="text-white text-xl font-bold mb-4">Overview</Text>
              <Text className="text-gray-300 text-base leading-6">
                {movie.overview || 'No overview available.'}
              </Text>
            </View>

            {/* Additional Details */}
            <View className="bg-gray-700 mx-6 rounded-2xl p-6 mb-10">
              <Text className="text-white text-lg font-bold mb-4">Details</Text>
              
              <View className="space-y-3">
                {movie.genres && (
                  <View className="flex-row">
                    <Text className="text-gray-400 w-20">Genres</Text>
                    <Text className="text-white flex-1">
                      {movie.genres.map((genre: any) => genre.name).join(', ')}
                    </Text>
                  </View>
                )}
                
                {movie.release_date && (
                  <View className="flex-row">
                    <Text className="text-gray-400 w-20">Release</Text>
                    <Text className="text-white flex-1">
                      {new Date(movie.release_date).toLocaleDateString()}
                    </Text>
                  </View>
                )}
                
                {movie.budget > 0 && (
                  <View className="flex-row">
                    <Text className="text-gray-400 w-20">Budget</Text>
                    <Text className="text-white flex-1">
                      ${movie.budget.toLocaleString()}
                    </Text>
                  </View>
                )}
                
                {movie.revenue > 0 && (
                  <View className="flex-row">
                    <Text className="text-gray-400 w-20">Revenue</Text>
                    <Text className="text-white flex-1">
                      ${movie.revenue.toLocaleString()}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Stats Cards */}
          <View className="flex-row justify-between mt-6">
            <View className="bg-gray-800 flex-1 mx-1 p-4 rounded-2xl items-center">
              <Ionicons name="stats-chart" size={24} color="#ef4444" />
              <Text className="text-white font-bold text-lg mt-2">{movie.vote_average?.toFixed(1)}</Text>
              <Text className="text-gray-400 text-xs">Rating</Text>
            </View>
            
            <View className="bg-gray-800 flex-1 mx-1 p-4 rounded-2xl items-center">
              <Ionicons name="people" size={24} color="#3b82f6" />
              <Text className="text-white font-bold text-lg mt-2">{movie.vote_count}</Text>
              <Text className="text-gray-400 text-xs">Votes</Text>
            </View>
            
            <View className="bg-gray-800 flex-1 mx-1 p-4 rounded-2xl items-center">
              <Ionicons name="flame" size={24} color="#f59e0b" />
              <Text className="text-white font-bold text-lg mt-2">
                {movie.popularity?.toFixed(0)}
              </Text>
              <Text className="text-gray-400 text-xs">Popularity</Text>
            </View>
          </View>


        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default MovieDetails;