import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import FONTS from '../constants/font'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
// npx react-native-asset

 const WelcomeScreen = () => {
    const ring1Padding = useSharedValue(0);
    const ring2Padding = useSharedValue(0);

    const navigation: any = useNavigation();

    useEffect(() => {
        ring1Padding.value = 0;
        ring2Padding.value = 0;

        setTimeout(() => ring1Padding.value = withSpring(ring1Padding.value+hp(5.5)), 100);
        setTimeout(() => ring2Padding.value = withSpring(ring2Padding.value+hp(5)), 300);

        setTimeout(() => navigation.navigate('Home'), 3000);
    }, [])

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFC107'
        }}>
            <Animated.View style={{
                backgroundColor: '#333333',
                borderRadius: 200,
                padding: ring1Padding
            }}>
                <Animated.View style={{
                    backgroundColor: '#786c6b',
                    borderRadius: 200,
                    padding: ring2Padding
                }}>
                    <Image source={{ uri: 'https://www.themealdb.com/images/media/meals/kos9av1699014767.jpg' }} style={{ width: hp(20), height: hp(20), borderRadius: 100 }} />
                </Animated.View>
            </Animated.View>

            <View style={{ alignItems: 'center', marginVertical: 20}}>
                <Text style={{ fontFamily: FONTS.POPPINS_BOLD, fontSize: hp(8), color: '#fff'}}>Foody</Text>
                <Text style={{ fontFamily: FONTS.POPPINS_SEMIBOLD, fontSize: hp(3), color: '#fff'}}>Food is always right</Text>
            </View>
        </View>
    )
}

export default WelcomeScreen;