import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface TrendingProps {
    movie: {
        movie_id: number,
        title: string, 
        poster_url: string,
        count: number
    },
    index: number
}

const TrendingCard = ({movie: {movie_id, title, poster_url, count}, index}: TrendingProps) => {
    
    const getRankStyle = (rank: number) => {
        switch (rank) {
            case 0: return { bg: '#ffd90058', glow: 'gold', emoji: '👑' };
            case 1: return { bg: '#c0c0c04b', glow: 'silver', emoji: '🥈' };
            case 2: return { bg: '#cd803249', glow: 'bronze', emoji: '🥉' };
            default: return { bg: '#ef44444b', glow: 'red', emoji: '⭐' };
        }
    };

    const rankStyle = getRankStyle(index);

    return (
        <Link href={`/movie/${movie_id}`} asChild>
            <TouchableOpacity className='mx-3 active:scale-95'>
                <View className='rounded-2xl overflow-hidden bg-gray-800 shadow-2xl border border-gray-700'>
                    {/* Main Content */}
                    <View className='relative'>
                        <Image 
                            source={{ uri: poster_url }} 
                            className='w-36 h-48'
                            resizeMode='cover'
                        />
                        
                        {/* Premium Overlay */}
                        <View className='absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60' />
                        
                        {/* Top Badges */}
                        <View className='absolute top-3 left-3 right-3 flex-row justify-between'>
                            <View className='bg-red-600 px-3 py-1 rounded-full'>
                                <Text className='text-white text-xs font-bold'>TRENDING</Text>
                            </View>
                            <View className='bg-black bg-opacity-70 px-2 py-1 rounded-full flex-row items-center'>
                                <Ionicons name="trending-up" size={12} color="white" />
                                <Text className='text-white text-xs font-bold ml-1'>{count}</Text>
                            </View>
                        </View>
                        
                        {/* Large Bottom Rank Number with Emoji */}
                        <View className='absolute bottom-0 bg-gradient-to-t from-black to-transparent pt-0 -pb-10 items-start justify-end'>
                            <View 
                                className='w-16 h-16 rounded-full items-center justify-center shadow-2xl -mb-10 border-2  border-white'
                                style={{ backgroundColor: rankStyle.bg }}
                            >
                                <Text className='text-black text-2xl font-black opacity-100'>
                                    {index + 1}
                                </Text>
                            </View>
                            <Text className='text-white text-lg font-bold'>{rankStyle.emoji}</Text>
                        </View>
                    </View>
                    
                    {/* Movie Title */}
                    <View className='p-4 bg-gray-900'>
                        <Text 
                            className='text-white text-base font-bold text-center leading-5' 
                            numberOfLines={2}
                        >
                            {title}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
}

export default TrendingCard;