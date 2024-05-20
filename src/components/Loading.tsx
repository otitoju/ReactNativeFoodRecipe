import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Loader({ props } : any) {
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
      <ActivityIndicator {...props}/>
    </View>
  )
}