import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { categoryData } from '../constants/dummy'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FONTS from '../constants/font';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function Categories({ categories, activeCategory, handleChangeCategory} : any) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15 }}
    //   style={{ marginHorizontal: 10 }}
      >

        {
            categories.map((cat: any, idx: number) => {
                let isActive = cat.strCategory === activeCategory;
                let activeButtonClass = isActive ? '#FFC107': 'gray'
                return (
                    <TouchableOpacity
                    key={idx}
                    onPress={() => handleChangeCategory(cat.strCategory)}
                    style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginVertical: 5,
                        marginHorizontal: 10
                    }}
                    >
                        <View style={{ borderRadius: 300, padding: 6, backgroundColor: activeButtonClass,}}>
                            <Image source={{ uri: cat.strCategoryThumb }} style={{ width: hp(6), height: hp(6), borderRadius: 100}}/>
                        </View>

                        <Text style={{ fontFamily: FONTS.POPPINS_REGULAR, fontSize: hp(1.8)}}>
                            {cat.strCategory}
                        </Text>

                    </TouchableOpacity>
                )
            })
        }

      </ScrollView>
    </Animated.View>
  )
}