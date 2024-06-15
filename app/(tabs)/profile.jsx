import { View, Text, FlatList, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { getUserPosts } from '../../lib/appwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'


const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppwrite( () => getUserPosts(user.$id));
  
  const logout = () => {
    
  }
  
  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={[{ id: 1}, { id: 2 }, { id: 3},]}
        keyExtractor={(item) => { item.$id}}
        renderItem = {({ item }) => (
          <VideoCard video={item}/>
          // <Text className="text-3xl text-white">{item.title}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="items-center justify-center w-full px-4 mt-6 mb-12">
            <TouchableOpacity 
              className="items-end w-full mb-10"
              onPress={logout}
            >
              <Image source={icons.logout}
               resizeMode='contain' className="w-6 h-6"
              />
            </TouchableOpacity>
          </View>
        )}

        ListEmptyComponent={() => {
          <EmptyState
           title="No Videos Found"
           subtitle="No videos found for this search query"
          />
        }}
      />
    </SafeAreaView>
  )
}

export default Profile