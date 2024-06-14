import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const SearchInput = ({
    title, value, placeholder, handleChangeText, otherStyles, ...props
}) => {
  const [showPssword, setShowPssword] = useState(false)

  return (

      <View className="flex-row items-center w-full h-16 px-4 space-x-4 border-2 border-black-200 bg-black-100 rounded-2xl focus:border-secondary">
       <TextInput
        className="flex-1 mt-0.5 text-base text-white font-pregular"
        value={value}
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === 'Password' && !showPssword}
       />

        <TouchableOpacity>
          <Image source={icons.search} className="w-5 h-5" resizeMode='contain' />
        </TouchableOpacity>
      </View>
  )
}

export default SearchInput