import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface Movie {
  id: number;
  poster_path: string | null;
  title: string;
  vote_average: number;
  release_date: string;
}

const MovieCard = ({ id, poster_path , title, vote_average, release_date }: Movie) => {
    // console.log(poster_path);
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-32 bg-gray-700 rounded-lg overflow-hidden m-2">
        {poster_path ? (
          <Image
            source={{ uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : `https://placehold.co/600x4000/1a1a1a/ffffff.png` }}
            className="w-full h-48"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-48 bg-gray-600 justify-center items-center">
            <Text className="text-white text-xs">No Image</Text>
          </View>
        )}

        <View className="p-2">
          <Text className="text-white text-xs font-bold" numberOfLines={1}>
            {title}
          </Text>
          <Text className="text-gray-400 text-xs">
            ⭐ {vote_average.toFixed(1)} | {release_date?.split('-')[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
