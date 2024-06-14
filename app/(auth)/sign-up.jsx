import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = async () => {
    if(!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fields.')
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username)
      // set it to global state....
      router.replace('/home')
    } catch(error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
           <Image source={images.logo}
           resizeMode='contain'
           className="w-[115px] h-[35px]"  />

           <Text className="mt-10 text-2xl text-white text-semibold font-psemibold">
            Sign up to Aora
           </Text>

           <FormField
             title="Username"
             value={form.username}
             handleChange={(e) => setForm({ ...form, username: e})}
             otherStyle="mt-10"
           />
           <FormField
             title="Email"
             value={form.email}
             handleChange={(e) => setForm({ ...form, email: e})}
             otherStyle="mt-7"
             keyboardType="email-address"
           />
           <FormField
             title="Password"
             value={form.password}
             handleChange={(e) => setForm({ ...form, password: e})}
             otherStyle="mt-7"
           />

           <CustomButton
             title="Sign up"
             handlePress={submit}
             containerStyle="mt-10"
             isLoading={isSubmitting}
           />

           <View className="flex-row justify-center gap-2 pt-5">
             <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
             </Text>
             <Link href="/sign-in" className="text-lg font-psemibold text-secondary">Log in</Link>
           </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp