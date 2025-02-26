import { View, Text, Platform, ScrollView, SectionList, Pressable, Alert } from 'react-native';
import React, { useCallback, useEffect, useRef, useState} from 'react';
import { TabsStackScreenProps } from '../Navigation/TabsNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadersComponent } from './../Components/HeaderComponents/HeaderComponent';
import ImageSlider from '../Components/HomeScreenComponents/ImageSlider';
import { ProductListParams, FetchProductsParam } from '../TypesCheck/HomeProps';
import { CategoryCard } from '../Components/HomeScreenComponents/CategoryCard';
import { fetchCategories, fetchProductsByCatID } from '../MiddleWares/HomeMiddleWares';
import { useFocusEffect } from '@react-navigation/native';
import { getProductByCatID } from '../../apiMongoDB/Controllers';

type Props = {}
const HomeScreen = ({ navigation, route }: TabsStackScreenProps<'Home'>) => {
  const sectionListRef = useRef<SectionList>(null);
  //const sectionListRef = useRef<SectionList<ProductListParams>>(null);


  const gotoCartScreen = () => {
    navigation.navigate('Cart');
  };

  const sliderImages = [
    'https://images.unsplash.com/photo-1570051008600-b34baa49e751?q=80&w=2085&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1739323006029-2d8452a47df6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
    'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=500&q=60',
    //require('../../assets/onboarding/lake.jpg'), // Depenedency array rỗng để tránh gọi lại không cần thiết
  ];

  const [getCategory, setGetCategory] = useState<ProductListParams[]>([]);
  const [getProductsByCatID, setGetProductsByCatID] = useState<ProductListParams[]>([]);
  const [activeCat, setActiveCat] = useState<string>('');
  const bgImg = require('../pictures/MenCategory.jpg');
  

  useEffect(() => {
    fetchCategories({ setGetCategory });
  }, []);

  useEffect(() => {
    console.log("fetchProductsByCatID", fetchProductsByCatID);
    if (activeCat) {
      fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat });
    }
  }, [activeCat]);

  useFocusEffect(
    useCallback(() => {
      fetchCategories({ setGetCategory });
      if (activeCat) {
        fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat });
      }
    }, [activeCat])
  );

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 40 : 0, flex: 1, backgroundColor: 'violet' }}>
      <HeadersComponent gotoCartScreen={gotoCartScreen} />
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={{ backgroundColor: '#efefef', flexDirection: 'row', padding: 10, marginVertical: 10 }}
      >
        <ImageSlider images={sliderImages} />
      </ScrollView>
      <View style={{ backgroundColor: "yellow", flex: 2 }}>
        <Text>
          Categories
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          style={{  marginTop: 4 }}
        >
          {
            getCategory.map((item, index) => (
              <CategoryCard 
                //key={index} 
                item={{ "name": item.name, "images": item.images, _id: item._id }}  
                catStyleProps={{                      
                    "height": 50,
                    "width": 55,                     
                    "radius": 20, 
                    "resizeMode": "contain"
                   // imageBgHt: 150,
                }}
                catProps={{ 
                    "activeCat": activeCat, "onPress": () => setActiveCat(item._id) 
                }}
              />
            ))
          }
        </ScrollView> 
      </View>
      <View style={{ 
        backgroundColor: 'red', flexDirection: "row", justifyContent: 'space-between', 
        marginTop: 10 
      }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 10 }}>
          Products from Selected Category
        </Text>
        <Pressable>
          <Text style={{ fontSize:10, fontWeight: 'bold', padding: 10 }}>
            View All
          </Text>
        </Pressable>
      </View>
      <View style={{ 
        backgroundColor: '#fff ', borderWidth:7, borderColor: 'green', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: "center", flexWrap: 'wrap',      
      }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {
            getProductsByCatID?.length > 0 ? (
              getProductsByCatID.map((item, index) => (
                <CategoryCard 
                  key={index} 
                  item={{ "name": item.name, "images": item.images, "_id": item._id }}  
                  catStyleProps={{                      
                      "height": 100,
                      "width": 100,                     
                      "radius": 10, 
                      "resizeMode": "contain"
                     // imageBgHt: 150,
                  }}
                  catProps={{ 
                      "onPress": () => Alert.alert(item.name), "imageBg": bgImg,
                  }}
                />
              ))
            ) : (
              <Text style={{ padding: 10 }}> No products found </Text>
            )}
        </ScrollView>

      </View>
    </SafeAreaView> // ✅ Properly closed SafeAreaView
  );
};

export default HomeScreen;
