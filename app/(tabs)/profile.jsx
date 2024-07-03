import { View, Text, FlatList, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { getUserPosts, signOut } from '../../lib/appwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppwrite( () => getUserPosts(user.$id));
  
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace( '/sign-in' )
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
            
            <View className="items-center justify-center w-16 h-16 rounded-lg border-secondary">
              <Image source={{ uri: user?.avatar }} 
               className="w-[90%] h-[90%] rounded-lg"
               resizeMode='cover'
              />
            </View>
            
            <InfoBox
              title="{user?.username}"
              containerStyles="mt-5"
              titleStyle="text-lg"
            />
            
            <View className="flex-row mt-5">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyles="mr-10"
                titleStyle="text-xl"
                />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyle="text-xl"
              />
            </View>
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