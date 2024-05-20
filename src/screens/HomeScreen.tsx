import { View, Text, ScrollView, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import FONTS from '../constants/font';
import Categories from '../components/Categories';
import axios from 'axios';
import Recipes from '../components/Recipes';


export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);



  const handleChangeCategory = (category: any) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  }

  const getCategories = async () => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      if(response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error: any) {
      console.log('error', error.message)
    }
  }

  const getRecipes = async (category="Beef") => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if(response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error: any) {
      console.log('error', error.message)
    }
  }

  useEffect(() => {
    getCategories();
    getRecipes();
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#fff',  }}>
      <ScrollView
       showsVerticalScrollIndicator={false}
       contentContainerStyle={{ paddingBottom: 50 }}
       style={{ marginVertical: 10, paddingTop: 5 }}
       >
        <View style={{
          marginHorizontal: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 2
        }}>
          <Image source={require('../../assests/images/user_icon.png')} style={{width: hp(5), height: hp(5)}}/>
          <BellIcon size={hp(4)} color="gray" />
        </View>

        <View style={{
          marginHorizontal: 10,
          marginVertical: 5,
          marginTop: 20
        }}>
          <Text style={{ fontFamily: FONTS.POPPINS_SEMIBOLD, fontSize: hp(2.2)}}>Hello, Otitoju</Text>

          <View>
            <Text style={{ fontSize: hp(4.0), fontFamily: FONTS.POPPINS_BOLD}}>Make your own food, </Text>
          </View>

          <Text style={{ fontSize: hp(4.0), fontFamily: FONTS.POPPINS_BOLD}}>Stay at <Text style={{color: '#FFC107'}}>home</Text></Text>
        </View>

        <View style={{
          marginHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 100,
          backgroundColor: '#C0C0C0',
          marginTop: 10
        }}>

          <TextInput 
          placeholder='Search any recipe'
          placeholderTextColor={'#333333'}
          style={{
            flex: 1,
            marginBottom: 1,
            paddingLeft: 20,
            fontFamily: FONTS.POPPINS_REGULAR
          }}
          />

          <View style={{
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 100,
            marginRight: 2
          }}>
            <MagnifyingGlassIcon size={hp(3.0)} color="gray" strokeWidth={3}/>
          </View>
        </View>


        <View style={{marginTop: 10}}>
          { categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}/>}
        </View>

        <View>
          <Recipes meals={meals} categories={categories}/>
        </View>
      </ScrollView>
    </View>
  )
}