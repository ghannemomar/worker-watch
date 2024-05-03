
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { HStack, Pressable, Text, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const BackHeader = () => {
    const navigation = useNavigation()
  return (
    <HStack py="1">
        <Pressable p="2" onPress={()=>navigation.goBack()} >
        <Ionicons name="arrow-back" size={30} color="white" />
        </Pressable>
    </HStack>
  )
}

export default BackHeader

