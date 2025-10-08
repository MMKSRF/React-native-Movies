import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    membership: 'Premium',
    joinDate: 'January 2024',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  const [stats, setStats] = useState({
    moviesWatched: 47,
    hoursWatched: 128,
    favorites: 12,
    reviews: 8
  });

  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    autoPlay: false,
    downloadQuality: 'HD'
  });

  const [activeTab, setActiveTab] = useState('activity');
  const [editModal, setEditModal] = useState(false);
  const [editUser, setEditUser] = useState(user);

  const watchHistory = [
    { id: 1, title: 'Inception', date: '2 days ago', duration: '2h 28m' },
    { id: 2, title: 'The Dark Knight', date: '1 week ago', duration: '2h 32m' },
    { id: 3, title: 'Interstellar', date: '2 weeks ago', duration: '2h 49m' },
  ];

  const achievements = [
    { id: 1, name: 'Movie Buff', icon: 'film', progress: 100 },
    { id: 2, name: 'Binge Watcher', icon: 'play-circle', progress: 75 },
    { id: 3, name: 'Critic', icon: 'create', progress: 50 },
    { id: 4, name: 'Explorer', icon: 'compass', progress: 25 },
  ];

  const handleSaveProfile = () => {
    setUser(editUser);
    setEditModal(false);
  };

  return (
    <View className="flex-1 bg-gray-900">
      {/* Header */}
      <LinearGradient
        colors={['#1f2937', '#111827']}
        className="pt-16 pb-6 px-6 rounded-b-3xl"
      >
        <View className="flex-row justify-between items-center mb-20">
         
        </View>

        {/* User Info */}
        <View className="items-center">
          <View className="relative">
            <Image
              source={{ uri: user.avatar }}
              className="w-24 h-24 rounded-full border-4 border-white"
            />
            <TouchableOpacity className="absolute bottom-0 right-0 bg-red-600 w-8 h-8 rounded-full items-center justify-center">
              <Ionicons name="camera" size={16} color="white" />
            </TouchableOpacity>
          </View>
          
          <Text className="text-white text-2xl font-bold mt-4">{user.name}</Text>
          <Text className="text-gray-400 text-base">{user.email}</Text>
          
          <View className="flex-row items-center mt-2">
            <View className="bg-red-600 px-3 py-1 rounded-full">
              <Text className="text-white text-sm font-bold">{user.membership}</Text>
            </View>
            <Text className="text-gray-400 text-sm ml-2">Member since {user.joinDate}</Text>
          </View>
        </View>
      </LinearGradient>






      <ScrollView className="flex-1 pt-32" showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View className="px-6 -mt-8">
          <View className="flex-row justify-between mb-6">
            <View className="bg-gray-800 rounded-2xl p-4 flex-1 mx-1">
              <Ionicons name="film" size={24} color="#ef4444" />
              <Text className="text-white text-lg font-bold mt-2">{stats.moviesWatched}</Text>
              <Text className="text-gray-400 text-xs">Movies Watched</Text>
            </View>
            
            <View className="bg-gray-800 rounded-2xl p-4 flex-1 mx-1">
              <Ionicons name="time" size={24} color="#3b82f6" />
              <Text className="text-white text-lg font-bold mt-2">{stats.hoursWatched}h</Text>
              <Text className="text-gray-400 text-xs">Watch Time</Text>
            </View>
            
            <View className="bg-gray-800 rounded-2xl p-4 flex-1 mx-1">
              <Ionicons name="heart" size={24} color="#ec4899" />
              <Text className="text-white text-lg font-bold mt-2">{stats.favorites}</Text>
              <Text className="text-gray-400 text-xs">Favorites</Text>
            </View>
          </View>
        </View>

        {/* Navigation Tabs */}
        <View className="flex-row px-6 mb-6 border-b border-gray-700">
          {['activity', 'achievements', 'settings'].map((tab) => (
            <TouchableOpacity
              key={tab}
              className={`flex-1 py-3 items-center ${
                activeTab === tab ? 'border-b-2 border-red-600' : ''
              }`}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                className={`font-semibold ${
                  activeTab === tab ? 'text-white' : 'text-gray-400'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View className="px-6 pb-8">
          {activeTab === 'activity' && (
            <View>
              <Text className="text-white text-xl font-bold mb-4">Recent Activity</Text>
              {watchHistory.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  className="flex-row items-center bg-gray-800 rounded-2xl p-4 mb-3"
                >
                  <View className="w-12 h-12 bg-red-600 rounded-lg items-center justify-center mr-4">
                    <Ionicons name="play" size={20} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-semibold">{item.title}</Text>
                    <Text className="text-gray-400 text-sm">{item.date}</Text>
                  </View>
                  <Text className="text-gray-400 text-sm">{item.duration}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {activeTab === 'achievements' && (
            <View>
              <Text className="text-white text-xl font-bold mb-4">Achievements</Text>
              <View className="flex-row flex-wrap justify-between">
                {achievements.map((achievement) => (
                  <View key={achievement.id} className="w-[48%] bg-gray-800 rounded-2xl p-4 mb-4">
                    <View className="w-12 h-12 bg-yellow-500 rounded-full items-center justify-center mb-3">
                      <Ionicons name={achievement.icon} size={24} color="white" />
                    </View>
                    <Text className="text-white font-semibold mb-2">{achievement.name}</Text>
                    <View className="w-full bg-gray-700 rounded-full h-2">
                      <View 
                        className="bg-green-500 rounded-full h-2" 
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </View>
                    <Text className="text-gray-400 text-xs mt-1">{achievement.progress}%</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {activeTab === 'settings' && (
            <View>
              <Text className="text-white text-xl font-bold mb-4">Settings</Text>
              
              <View className="bg-gray-800 rounded-2xl p-4 mb-4">
                <View className="flex-row justify-between items-center mb-4">
                  <View>
                    <Text className="text-white font-semibold">Push Notifications</Text>
                    <Text className="text-gray-400 text-sm">Get updates about new movies</Text>
                  </View>
                  <Switch
                    value={settings.notifications}
                    onValueChange={(value) => setSettings({...settings, notifications: value})}
                    trackColor={{ false: '#6b7280', true: '#ef4444' }}
                  />
                </View>

                <View className="flex-row justify-between items-center mb-4">
                  <View>
                    <Text className="text-white font-semibold">Dark Mode</Text>
                    <Text className="text-gray-400 text-sm">Better for night viewing</Text>
                  </View>
                  <Switch
                    value={settings.darkMode}
                    onValueChange={(value) => setSettings({...settings, darkMode: value})}
                    trackColor={{ false: '#6b7280', true: '#ef4444' }}
                  />
                </View>

                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-white font-semibold">Auto-play Trailers</Text>
                    <Text className="text-gray-400 text-sm">Play previews automatically</Text>
                  </View>
                  <Switch
                    value={settings.autoPlay}
                    onValueChange={(value) => setSettings({...settings, autoPlay: value})}
                    trackColor={{ false: '#6b7280', true: '#ef4444' }}
                  />
                </View>
              </View>

              <TouchableOpacity className="bg-red-600 rounded-2xl p-4 items-center">
                <Text className="text-white font-bold text-lg">Sign Out</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={editModal}
        animationType="slide"
        transparent={true}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-gray-800 rounded-t-3xl p-6 max-h-[80%]">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-white text-xl font-bold">Edit Profile</Text>
              <TouchableOpacity onPress={() => setEditModal(false)}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <View className="items-center mb-6">
                <Image
                  source={{ uri: editUser.avatar }}
                  className="w-20 h-20 rounded-full mb-4"
                />
                <TouchableOpacity className="bg-red-600 px-4 py-2 rounded-full">
                  <Text className="text-white font-semibold">Change Photo</Text>
                </TouchableOpacity>
              </View>

              <View className="space-y-4">
                <View>
                  <Text className="text-gray-400 text-sm mb-2">Name</Text>
                  <TextInput
                    className="bg-gray-700 text-white rounded-xl p-4"
                    value={editUser.name}
                    onChangeText={(text) => setEditUser({...editUser, name: text})}
                  />
                </View>

                <View>
                  <Text className="text-gray-400 text-sm mb-2">Email</Text>
                  <TextInput
                    className="bg-gray-700 text-white rounded-xl p-4"
                    value={editUser.email}
                    onChangeText={(text) => setEditUser({...editUser, email: text})}
                    keyboardType="email-address"
                  />
                </View>
              </View>

              <TouchableOpacity 
                className="bg-red-600 rounded-xl p-4 mt-6 items-center"
                onPress={handleSaveProfile}
              >
                <Text className="text-white font-bold text-lg">Save Changes</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;