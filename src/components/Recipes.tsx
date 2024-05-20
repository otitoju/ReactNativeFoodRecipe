import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from '../constants/font';
import MasonryList from '@react-native-seoul/masonry-list'
import { mealData } from '../constants/dummy';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loader from './Loading';
import { useNavigation } from '@react-navigation/native';

export default function Recipes({ categories, meals }: any) {
    const navigation = useNavigation();
    return (
        <View style={{
            paddingHorizontal: 10,
            marginTop: 10
        }}>
            <Text style={{ fontSize: hp(3), fontFamily: FONTS.POPPINS_SEMIBOLD }}>Recipes</Text>

            <View>
                {
                    categories.length === 0 || meals.length === 0 ? (
                        <Loader size="large" style={{ marginTop: 50 }}/>
                    ) : (
                        <MasonryList
                            data={meals}
                            keyExtractor={(item) => item.idMeal}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation={navigation}/>}
                            // refreshing={isLoadingNext}
                            // onRefresh={() => refetch({ first: ITEM_CNT })}
                            onEndReachedThreshold={0.1}
                        // onEndReached={() => loadNext(ITEM_CNT)}
                        />
                    )
                }

            </View>
        </View>
    )
}

const RecipeCard = ({ item, index , navigation}: any) => {
    const isEven = index % 2 == 0;
    return (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
            <Pressable
                style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0, justifyContent: 'center', marginBottom: 10 }}
                onPress={() => navigation.navigate('RecipeDetail', { ...item })}
            >
                <Animated.Image
                    source={{ uri: item.strMealThumb }}
                    sharedTransitionTag={item.strMeal}
                    style={{ width: '100%', height: index % 3 == 0 ? hp(25) : hp(35), borderRadius: 35, backgroundColor: 'gray' }}
                />
                <Text style={{ fontFamily: FONTS.POPPINS_SEMIBOLD, marginLeft: 10, color: 'gray', fontSize: hp(1.5) }}>
                    {item.strMeal?.length > 20 ? item.strMeal?.slice(0, 20) + '...' : item.strMeal}
                </Text>
            </Pressable>

        </Animated.View>
    )
}