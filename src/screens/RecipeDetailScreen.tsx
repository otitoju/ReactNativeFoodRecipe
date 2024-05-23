import { View, Text, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon } from 'react-native-heroicons/outline';
import { HeartIcon, UsersIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loader from '../components/Loading';
import FONTS from '../constants/font';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated from 'react-native-reanimated';


const RecipeDetailScreen = (props: any) => {
    const item = props.route.params;

    const [isFavorite, setIsFavorite] = useState(false);
    const [meal, setMeal] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();


    useEffect(() => {
        getMealData(item.idMeal);
    }, [])


    const getMealData = async (id: any) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            if (response && response.data) {
                setMeal(response.data.meals[0]);
                setLoading(false);
            }
        } catch (error: any) {
            console.log('error', error.message);
            setLoading(false);
        }
    }

    const ingredientsIndexes = (meal: any) => {
        if (!meal) return [];
        let indexes = [];

        for (let i = 1; i <= 20; i++) {
            if (meal['strIngredient' + i]) {
                indexes.push(i);
            }
        }

        return indexes;
    }

    const getYoutubeVideoId = (url: any) => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if(match && match[1]) {
            return match[1]
        }

        return null;
    }

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: '#fff'
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
        >
            <StatusBar barStyle={"light-content"} />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                <Animated.Image
                    source={{ uri: item.strMealThumb }}
                   sharedTransitionTag={item.strMeal}
                    style={{
                        width: hp(53),
                        height: hp(50),
                        borderRadius: 23,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        // marginTop: 4
                    }}
                    
                />
                
            </View>

            <View style={{
                width: '100%',
                position: 'absolute',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 20,
                paddingLeft: 4
            }}>
                <TouchableOpacity style={{
                    padding: 8,
                    marginLeft: 10,
                    backgroundColor: '#fff',
                    borderRadius: 100
                }}
                    onPress={() => navigation.goBack()}
                >
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
                </TouchableOpacity>


                <TouchableOpacity style={{
                    padding: 8,
                    marginRight: 10,
                    backgroundColor: '#fff',
                    borderRadius: 100
                }}
                    onPress={() => setIsFavorite(!isFavorite)}
                >
                    <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavorite ? "red" : "gray"} />
                </TouchableOpacity>

            </View>


            {
                loading ? (
                    <View>
                        <Loader size={"large"} />
                    </View>
                )

                    : (
                        <View style={{
                            paddingHorizontal: 8,
                            justifyContent: 'space-between',
                            marginVertical: 6,
                            paddingTop: 8
                        }}>
                            <View style={{ marginVertical: 4 }}>
                                <Text style={{
                                    fontFamily: FONTS.POPPINS_SEMIBOLD,
                                    fontSize: hp(3),
                                    flex: 1,
                                    color: "black"
                                }}>{meal?.strMeal}</Text>

                                <Text style={{
                                    fontFamily: FONTS.POPPINS_REGULAR,
                                    fontSize: hp(2),
                                    flex: 1,
                                    color: '#232324'
                                }}>{meal?.strArea}</Text>
                            </View>


                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                            }}>
                                <View style={{
                                    display: 'flex',
                                    borderRadius: 100,
                                    backgroundColor: '#FFC107',
                                    padding: 5,
                                }}>

                                    <View style={{
                                        height: hp(6.5),
                                        width: hp(6.5),
                                        backgroundColor: 'white',
                                        borderRadius: 100,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <ClockIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
                                    </View>

                                    <View style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingVertical: 2,
                                        marginVertical: 1
                                    }}>
                                        <Text style={{
                                            fontSize: hp(2),
                                            fontFamily: FONTS.POPPINS_SEMIBOLD,
                                            color: 'black'
                                        }}>35</Text>

                                        <Text style={{
                                            fontSize: hp(1.3),
                                            fontFamily: FONTS.POPPINS_SEMIBOLD,
                                            color: 'black'
                                        }}>Mins</Text>
                                    </View>
                                </View>

                                <View style={{
                                    display: 'flex',
                                    borderRadius: 100,
                                    backgroundColor: '#FFC107',
                                    padding: 5,
                                }}>

                                    <View style={{
                                        height: hp(6.5),
                                        width: hp(6.5),
                                        backgroundColor: 'white',
                                        borderRadius: 100,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <UsersIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
                                    </View>

                                    <View style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingVertical: 2,
                                        marginVertical: 1
                                    }}>
                                        <Text style={{
                                            fontSize: hp(2),
                                            fontFamily: FONTS.POPPINS_SEMIBOLD,
                                            color: 'black'
                                        }}>05</Text>

                                        <Text style={{
                                            fontSize: hp(1.3),
                                            fontFamily: FONTS.POPPINS_SEMIBOLD,
                                            color: 'black'
                                        }}>Serving</Text>
                                    </View>
                                </View>

                                <View style={{
                                    display: 'flex',
                                    borderRadius: 100,
                                    backgroundColor: '#FFC107',
                                    padding: 5,
                                }}>

                                    <View style={{
                                        height: hp(6.5),
                                        width: hp(6.5),
                                        backgroundColor: 'white',
                                        borderRadius: 100,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <FireIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
                                    </View>

                                    <View style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingVertical: 2,
                                        marginVertical: 1
                                    }}>
                                        <Text style={{
                                            fontSize: hp(2),
                                            fontFamily: FONTS.POPPINS_SEMIBOLD,
                                            color: 'black'
                                        }}>103</Text>

                                        <Text style={{
                                            fontSize: hp(1.3),
                                            fontFamily: FONTS.POPPINS_SEMIBOLD,
                                            color: 'black'
                                        }}>Cal</Text>
                                    </View>
                                </View>

                                <View style={{
                                    display: 'flex',
                                    borderRadius: 100,
                                    backgroundColor: '#FFC107',
                                    padding: 5,
                                }}>

                                    <View style={{
                                        height: hp(6.5),
                                        width: hp(6.5),
                                        backgroundColor: 'white',
                                        borderRadius: 100,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
                                    </View>

                                    <View style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingVertical: 2,
                                        marginVertical: 1
                                    }}>
                                        <Text style={{
                                            fontSize: hp(2),
                                            fontFamily: FONTS.POPPINS_SEMIBOLD,
                                            color: 'black'
                                        }}>

                                        </Text>

                                        <Text style={{
                                            fontSize: hp(1.3),
                                            fontFamily: FONTS.POPPINS_SEMIBOLD,
                                            color: 'black'
                                        }}>Easy</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{
                                marginVertical: 5
                            }}>
                                <Text style={{ flex: 1, fontSize: hp(2.5), fontFamily: FONTS.POPPINS_SEMIBOLD, color: 'black' }}>
                                    Ingredients
                                </Text>

                                <View style={{
                                    marginVertical: 3,
                                    marginLeft: 3
                                }}>
                                    {
                                        ingredientsIndexes(meal).map(i => (
                                            <View key={i} style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginHorizontal: 4,
                                                // marginBottom: 4
                                            }}>
                                                <View style={{ height: hp(1.5), width: hp(1.5), borderRadius: 100, backgroundColor: '#FFC107', marginRight: 10 }} />

                                                <View style={{
                                                    flexDirection: 'row',
                                                    marginHorizontal: 4
                                                }}>
                                                    <Text style={{ fontSize: hp(1.8), fontFamily: FONTS.POPPINS_SEMIBOLD, color: 'black', marginRight: 2 }}>
                                                        {meal['strMeasure' + i]}
                                                    </Text>

                                                    <Text style={{ fontSize: hp(1.8), fontFamily: FONTS.POPPINS_REGULAR, color: 'gray' }}>
                                                        {meal['strIngredient' + i]}
                                                    </Text>
                                                </View>
                                            </View>
                                        ))
                                    }
                                </View>
                            </View>

                            <View style={{
                                marginVertical: 5
                            }}>
                                <Text style={{ flex: 1, fontSize: hp(2.5), fontFamily: FONTS.POPPINS_SEMIBOLD, color: 'black' }}>
                                    Instructions
                                </Text>

                                <Text style={{ fontFamily: FONTS.POPPINS_REGULAR, fontSize: hp(1.6), color: 'gray' }}>
                                    {
                                        meal?.strInstructions
                                    }
                                </Text>
                            </View>

                            <View>
                                {
                                    meal?.strYoutube && (
                                        <View>
                                            <Text style={{ flex: 1, fontSize: hp(2.5), fontFamily: FONTS.POPPINS_SEMIBOLD, color: 'black' }}>
                                                Recipe Video
                                            </Text>

                                            <View>
                                                <YoutubeIframe 
                                                videoId={getYoutubeVideoId(meal?.strYoutube)}
                                                height={hp(30)}
                                                />
                                            </View>
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                    )
            }
        </ScrollView>
    )
}

export default RecipeDetailScreen;