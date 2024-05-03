
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HStack, Pressable, Text, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const DrawerHeader = () => {
    const navigation = useNavigation()
  return (
    <HStack py="1">
        <Pressable p="2" onPress={()=>navigation.openDrawer()} >
        <MaterialCommunityIcons name="menu" size={30} color="white" />
        </Pressable>
    </HStack>
  )
}

export default DrawerHeader

