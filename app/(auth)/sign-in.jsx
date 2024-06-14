import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import signIn from '../../lib/appwrite';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = async () => {
    if(!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fields.')
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password)
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
            Log in to Aora
           </Text>

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
             title="Sign in"
             handlePress={submit}
             containerStyle="mt-7"
             isLoading={isSubmitting}
           />

           <View className="flex-row justify-center gap-2 pt-5">
             <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
             </Text>
             <Link href="/sign-up" className="text-lg font-psemibold text-secondary">Sign Up</Link>
           </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn