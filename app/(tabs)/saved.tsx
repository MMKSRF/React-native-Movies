import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const Saved = () => {
  const [activeTab, setActiveTab] = useState('watchlist');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [createListModal, setCreateListModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [customLists, setCustomLists] = useState([
    { id: '1', name: 'Action Packed', count: 8, color: '#ef4444' },
    { id: '2', name: 'Weekend Binge', count: 12, color: '#3b82f6' },
    { id: '3', name: 'Classics', count: 5, color: '#10b981' },
  ]);

  const watchlist = [
    {
      id: '1',
      title: 'Inception',
      year: 2010,
      rating: 8.8,
      duration: '2h 28m',
      genre: ['Sci-Fi', 'Action'],
      poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      addedDate: '2 days ago'
    },
    {
      id: '2',
      title: 'The Shawshank Redemption',
      year: 1994,
      rating: 9.3,
      duration: '2h 22m',
      genre: ['Drama'],
      poster: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      addedDate: '1 week ago'
    },
    {
      id: '3',
      title: 'The Dark Knight',
      year: 2008,
      rating: 9.0,
      duration: '2h 32m',
      genre: ['Action', 'Crime', 'Drama'],
      poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      addedDate: '3 days ago'
    },
    {
      id: '4',
      title: 'Pulp Fiction',
      year: 1994,
      rating: 8.9,
      duration: '2h 34m',
      genre: ['Crime', 'Drama'],
      poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
      addedDate: '5 days ago'
    }
  ];

  const favorites = [
    {
      id: '1',
      title: 'Interstellar',
      year: 2014,
      rating: 8.6,
      duration: '2h 49m',
      genre: ['Adventure', 'Drama', 'Sci-Fi'],
      poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      addedDate: '1 month ago'
    }
  ];

  const watched = [
    {
      id: '1',
      title: 'The Godfather',
      year: 1972,
      rating: 9.2,
      duration: '2h 55m',
      genre: ['Crime', 'Drama'],
      poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      watchedDate: 'Yesterday',
      yourRating: 5
    }
  ];

  const getCurrentList = () => {
    switch (activeTab) {
      case 'watchlist': return watchlist;
      case 'favorites': return favorites;
      case 'watched': return watched;
      default: return customLists.find(list => list.id === activeTab)?.movies || [];
    }
  };

  const handleCreateList = () => {
    if (newListName.trim()) {
      const newList = {
        id: Date.now().toString(),
        name: newListName,
        count: 0,
        color: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][customLists.length % 5],
        movies: []
      };
      setCustomLists([...customLists, newList]);
      setNewListName('');
      setCreateListModal(false);
    }
  };

  const handleRemoveFromList = (movieId) => {
    Alert.alert(
      'Remove Movie',
      'Are you sure you want to remove this movie?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            // Implementation to remove movie from list
            console.log('Remove movie:', movieId);
          }
        }
      ]
    );
  };

  const MovieCard = ({ movie, showDate = true }) => (
    <TouchableOpacity 
      className="bg-gray-800 rounded-2xl overflow-hidden mb-4 mx-2 flex-1 min-w-[48%]"
      onPress={() => setSelectedMovie(movie)}
    >
      <View className="relative">
        <Image
          source={{ uri: movie.poster }}
          className="w-full h-52"
          resizeMode="cover"
        />
        <View className="absolute top-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded-full">
          <Text className="text-white text-xs font-bold">⭐ {movie.rating}</Text>
        </View>
        {activeTab === 'watched' && (
          <View className="absolute top-2 left-2 bg-green-600 px-2 py-1 rounded-full">
            <Text className="text-white text-xs font-bold">Watched</Text>
          </View>
        )}
      </View>
      
      <View className="p-3">
        <Text className="text-white font-bold text-sm mb-1" numberOfLines={1}>
          {movie.title}
        </Text>
        <Text className="text-gray-400 text-xs mb-2">{movie.year}</Text>
        
        <View className="flex-row flex-wrap mb-2">
          {movie.genre.map((genre, index) => (
            <View key={index} className="bg-gray-700 px-2 py-1 rounded-full mr-1 mb-1">
              <Text className="text-gray-300 text-xs">{genre}</Text>
            </View>
          ))}
        </View>
        
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-400 text-xs">{movie.duration}</Text>
          {showDate && (
            <Text className="text-gray-500 text-xs">{movie.addedDate || movie.watchedDate}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const CustomListCard = ({ list }) => (
    <TouchableOpacity 
      className="rounded-2xl p-4 mb-3 mx-2"
      style={{ backgroundColor: list.color }}
      onPress={() => setActiveTab(list.id)}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <Text className="text-white font-bold text-lg mb-1">{list.name}</Text>
          <Text className="text-white text-opacity-80 text-sm">
            {list.count} {list.count === 1 ? 'movie' : 'movies'}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="white" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View className='bg-gray-900 flex-1'>
      {/* Header */}
      <LinearGradient
        colors={['#1f2937', '#111827']}
        className="pt-16 pb-6 px-6 rounded-b-3xl"
      >


          <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white text-2xl font-bold"></Text>

      
          
        </View>

        <View className="flex-row justify-center items-center mb-4">
          <Text className="text-white text-2xl font-bold"></Text>

          <TouchableOpacity 
            className="bg-red-600 w-10 h-10 rounded-full items-center justify-center"
            onPress={() => setCreateListModal(true)}
          >
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
          
        </View>

        {/* Stats */}
        <View className="flex-row justify-between">
          <View className="items-center">
            <Text className="text-white text-lg font-bold">{watchlist.length}</Text>
            <Text className="text-gray-400 text-sm">Watchlist</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-lg font-bold">{favorites.length}</Text>
            <Text className="text-gray-400 text-sm">Favorites</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-lg font-bold">{watched.length}</Text>
            <Text className="text-gray-400 text-sm">Watched</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-lg font-bold">{customLists.length}</Text>
            <Text className="text-gray-400 text-sm">Lists</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Main Tabs */}
        <View className="flex-row px-6 py-4 border-b border-gray-700">
          {[
            { id: 'watchlist', icon: 'bookmark', label: 'Watchlist' },
            { id: 'favorites', icon: 'heart', label: 'Favorites' },
            { id: 'watched', icon: 'checkmark-done', label: 'Watched' }
          ].map((tab) => (
            <TouchableOpacity
              key={tab.id}
              className={`flex-1 items-center py-2 mx-1 rounded-full ${
                activeTab === tab.id ? 'bg-red-600' : 'bg-gray-800'
              }`}
              onPress={() => setActiveTab(tab.id)}
            >
              <Ionicons 
                name={tab.icon} 
                size={16} 
                color={activeTab === tab.id ? "white" : "#9ca3af"} 
              />
              <Text className={`text-xs mt-1 ${
                activeTab === tab.id ? 'text-white font-bold' : 'text-gray-400'
              }`}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Custom Lists Section */}
        {activeTab === 'watchlist' && customLists.length > 0 && (
          <View className="px-6 mt-4">
            <Text className="text-white text-lg font-bold mb-3">My Lists</Text>
            {customLists.map((list) => (
              <CustomListCard key={list.id} list={list} />
            ))}
          </View>
        )}

        {/* Movies Grid */}
        <View className="px-4 mt-4">
          <Text className="text-white text-xl font-bold mb-4 px-2">
            {activeTab === 'watchlist' && 'Movies to Watch'}
            {activeTab === 'favorites' && 'Favorite Movies'}
            {activeTab === 'watched' && 'Watched Movies'}
            {customLists.find(list => list.id === activeTab)?.name}
          </Text>

          {getCurrentList().length > 0 ? (
            <View className="flex-row flex-wrap justify-between">
              {getCurrentList().map((movie) => (
                <View key={movie.id} className="w-[48%] mb-4">
                  <MovieCard 
                    movie={movie} 
                    showDate={activeTab !== 'custom'}
                  />
                  <TouchableOpacity 
                    className="absolute top-2 right-2 bg-black bg-opacity-70 w-8 h-8 rounded-full items-center justify-center z-10"
                    onPress={() => handleRemoveFromList(movie.id)}
                  >
                    <Ionicons name="close" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View className="items-center justify-center py-20">
              <Ionicons name="bookmark-outline" size={64} color="#4b5563" />
              <Text className="text-gray-400 text-lg mt-4 text-center">
                {activeTab === 'watchlist' && 'No movies in watchlist'}
                {activeTab === 'favorites' && 'No favorite movies yet'}
                {activeTab === 'watched' && 'No watched movies'}
              </Text>
              <Text className="text-gray-500 text-sm mt-2 text-center px-8">
                Start adding movies to your {activeTab} to see them here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Create List Modal */}
      <Modal
        visible={createListModal}
        animationType="slide"
        transparent={true}
      >
        <View className="flex-1 justify-start pt-15 bg-black/50">



          <View className="bg-gray-800 rounded-t-3xl p-6 pt-16  pb-10">

            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-white text-xl font-bold">Create New List</Text>
              <TouchableOpacity onPress={() => setCreateListModal(false)}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <TextInput
              className="bg-gray-700 text-white rounded-xl p-4 mb-6"
              placeholder="List name..."
              placeholderTextColor="#9ca3af"
              value={newListName}
              onChangeText={setNewListName}
            />

            <TouchableOpacity 
              className="bg-red-600 rounded-xl p-4 items-center"
              onPress={handleCreateList}
            >
              <Text className="text-white font-bold text-lg">Create List</Text>
            </TouchableOpacity>
          </View>






        </View>
      </Modal>
    </View>
  );
};

export default Saved;