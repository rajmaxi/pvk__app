
/*************************************************************************
 * 
 * Poorvika CONFIDENTIAL
 * __________________
 * 
 *  2009 - 2020 Poorvika Systems Incorporated 
 *  All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of Poorvika Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Poorvika Systems Incorporated
 * and its suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Poorvika Systems Incorporated.
 */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, FlatList, TextInput, Alert, ActivityIndicator } from 'react-native';
import { _getProductDetails } from './service';
import _ from 'lodash';
import AntIcon from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import { ProgressBar, Colors } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { Navigation } from "react-native-navigation";
import { View, Text, Card, Button, Image, Carousel, } from 'react-native-ui-lib';
import CustomHeader from '../../components/customheader';
import styles from './styles';
import CatPlaceHolder from '../../components/catPagePlaceholder';
import Share from "react-native-share";
// import AsyncStorage from '@react-native-community/async-storage';
// var RNFS = require('react-native-fs');

console.disableYellowBox = true
const productInfo: React.FC<productprops> = (productprops: any) => {
  const loadNumber = useSelector((state: cartItemState) => state.cartstate.loadingNumber);
  const cartitems = useSelector((state: cartItemState) => state.cartstate.cartItems);
  const dispatch = useDispatch();
  const [dataProduct, setDataProduct] = useState([]);
  const [productImage, setProductImage] = useState([]);
  const [productKeypoint, setProductKeypoint] = useState([]);
  const [ratingStar, setRatingStar] = useState([]);
  const [Pincode, setPincode] = useState('');
  const [cartData, setCartData] = useState([]);

  const [qty, setQty] = useState(() => { return 1 })
  // const sideMenu = (props: HelloProps) => {
  useEffect(() => {
    fetchApi();
    console.log("productInfo Page", productprops);
  }, [])
  const fetchApi = async () => {
    //{ paramsValue: { id: string } }
    let productId = productprops.id;
    const a = await _getProductDetails(4129);
    console.log('product info Api', a);
    (a) ? (setDataProduct(a.data), setProductKeypoint(a.data.attribute_groups)) : null
    var img = [] as any;
    a.data.additional_image_color.forEach((element: { image: String }) => {
      img.push("https://apps2.poorvikamobile.com/image/" + element.image);
      // console.log("https://apps2.poorvikamobile.com/image/" + element.image);
    });
    (img.length != 0) ? (setProductImage(img)) : null;
    // (a.data.rating != 0) ? (setReviewData(a.data.reviews.reviews)) : null;
    (a.data.rating != 0) ? (_getreViewLength(a.data.reviews)) : null;
  }
  const _getreViewLength = (a: { reviews: Array<{ rating: number }> }) => {
    console.log('get progress ber', a);
    var reviewData = a.reviews;
    let result: any = {};
    for (var i = 0; i < reviewData.length; ++i) {
      if (!result[reviewData[i].rating]) {
        result[reviewData[i].rating] = 0;
        ++result[reviewData[i].rating];
      }
    }
    console.log(result)
    for (let i = 1; i <= 5; i++) {
      if (result[i] == undefined) {
        result[i] = 0;
      }
    }
    console.log(result)
    let star = [];
    for (var key in result) {
      let value = result[key];
      star.push(value);
    }
    let count = 0,
      sum = star.reduce(function (sum, item, index) {
        count += item;
        return sum + item * (index + 1);
      }, 0);
    var rating = sum / count;
    var sums = star.reduce(add, 0);
    function add(a, b) {
      return a + b;
    }
    var starper = [] as any;
    var colorCode = ['#808080', '#ff0000', '#ffff00', '#0000ff', '#008000']
    for (let i = star.length - 1; i >= 0; i--) {
      starper.push({
        "star": i + 1,
        "percentage": (star[i] / sums),
        "colorCode": colorCode[i]
      });
    }

    setRatingStar(starper);
    console.log("this.starper", starper);
  }
  const _renderItem = (item: { text: string, name: string }) => {
    return (
      (item.name == 'Primary' || item.name == 'Internal' || item.name == 'Secondary' || item.name == 'Ram' || item.name == 'BATTERY' || item.name == 'Chipset') ? (
        <>
          <View>
            <Text marginT-4 marginL-15 marginB-5>{'\u2022' + " "}{item.text}</Text>
          </View>
        </>) : null
    )
  }
  const _productSpec = (bodySpecificatin: any, bodydescription: any, num: number) => {
    var name: string;
    (num == 1) ? name = "Specification" : name = "Description"
    Navigation.push(productprops.componentId, {
      component: {
        id: 'porductSpecId',
        name: 'porductSpec',
        passProps: {
          paramsValue: {
            value: bodySpecificatin,
            des: bodydescription,
            names: name
          }
        }, options: {
          bottomTabs: {
            visible: false,
            drawBehind: true
          }
        }
      }
    });
  }

  const _favorate = async (dataProduct: User) => {
    // let wish = [] as any;
    // try {
    //   await AsyncStorage.setItem('favorate', JSON.stringify(wish));
    // } catch (error) {
    //   console.log("SetItem error ", error)
    //   return null;
    // }
    // console.log(dataProduct);
    // console.log(dataProduct.id, dataProduct.manufacturer, dataProduct.name, dataProduct.price_formated, dataProduct.special_formated, dataProduct.stock_status_id, dataProduct.stock_status);
  }

  const _share = async (dataProduct: shareTypes) => {
    console.log(dataProduct);
    const options = {
      title: dataProduct.name,
      message: 'poorvika best offer',
      url: "https://www.poorvikamobile.com/" + dataProduct.seo_url,
      subject: 'only poorvikaMobiles'
    };
    Share.open(options)
      .then((res) => { console.log(res) })
      .catch((err) => { err && console.log(err); });
  }
  const _buyNow = () => {
    console.log(qty);
  }
  const _addCartdata = async (dataProduct: productprops) => {
    // await AsyncStorage.removeItem('cartData');
    var a = cartitems.filter((items) => {
      return items.key == dataProduct.id
    })
    console.log(a, 'a value');

    if (a.length != 0) {
      Alert.alert('This product alredy in cart')
    } else {
      var addedItems = {
        name: dataProduct.name,
        id: dataProduct.id,
        image: 'https://apps2.poorvikamobile.com/image/' + dataProduct.additional_image_color[0].image,
        price_formated: dataProduct.price_formated,
        special_formated: dataProduct.special_formated,
        price: dataProduct.price,
        special: dataProduct.special,
        key: dataProduct.id,
        by: dataProduct.manufacturer,
        quantity: 1
      }
      dispatch({ type: 'ADDTOCART', payload: addedItems, numbersChange: Math.floor(Math.random() * (1000 - 100 + 1)) + 100 })
      console.log('else cart', addedItems);
    }
  }

  return (
    <View flex>
      <CustomHeader componentId={productprops.componentId} title={productImage.manufacturer} />
      {
        (productImage.length != 0) ? (
          <>
            < ScrollView style={{ backgroundColor: 'red'}}>
              <View >
                {
                  (productImage.length != 0) ? (
                    <>
                      <View marginT-10 style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#aeb0b2', marginBottom: 0, paddingBottom: 0 }}>
                      <View style={{ width: '100%' }}>
                          <Carousel containerStyle={{ height: 250, backgroundColor: 'white' }}
                            counterTextStyle={{ color: 'white' }}
                            // pageControlPosition={'under'}
                            showCounter={true}
                            initialPage={0} loop allowAccessibleLayout autoplay={false}>
                            {_.map(productImage, (image: any, index: number) => {
                              return (
                                <View key={index} flex paddingVertical-10 bottom>
                                  <Image
                                    style={[StyleSheet.absoluteFillObject, { height: 250 }]}
                                    resizeMode='contain'
                                    source={{ uri: image }}
                                  />
                                </View>
                              );
                            })}
                          </Carousel>
                        </View>
                        <View marginT-5 paddingL-5 style={{ width: '100%' }}>
                          <Text style={{ fontSize: 14, letterSpacing: 3, fontFamily: 'AntDesign', marginLeft: 10,paddingBottom: 20,color:'#1b1b1b'}}>{dataProduct.name}</Text>
                          <View marginT-20>
                            {(!dataProduct.special) ? (
                              <>
                                <Text style={{ fontSize: 16, letterSpacing: 1, fontFamily: 'AntDesign', fontWeight: '600' }}>price: {dataProduct.price_formated}</Text>
                              </>
                            ) : (
                                <>
                                  <Text style={{ fontSize: 16, letterSpacing: 1, fontFamily: 'AntDesign', fontWeight: '600' }}>Special{dataProduct.special_formated}</Text>
                                  <Text style={{
                                    textDecorationLine: 'line-through',
                                    textDecorationStyle: "solid",
                                    textDecorationColor: "#000"
                                  }}>price{dataProduct.price_formated}</Text>
                                </>)}
                          </View>
                          <View marginT-9>
                            {
                              (dataProduct.stock_status_id == 1) ? (
                                <>
                                  <Text style={{ fontSize: 16, letterSpacing: 1, fontFamily: 'AntDesign', fontWeight: '600' }}>stock: {dataProduct.stock_status}</Text>
                                </>) : (<></>)
                            }
                          </View>
                          <View marginT-9>
                            <Text style={{ fontSize: 16, letterSpacing: 1, fontFamily: 'AntDesign', fontWeight: '600' }}>Brand: {dataProduct.manufacturer}</Text>

                            <Text style={{ fontSize: 16, letterSpacing: 1, fontFamily: 'AntDesign', fontWeight: '600', marginTop: 9 }}>View: {dataProduct.viewed}</Text>
                            {
                              (dataProduct.rating != 0) ? (
                                <>
                                  <Text style={{ fontSize: 16, letterSpacing: 1, fontFamily: 'AntDesign', fontWeight: '600', marginTop: 9 }}>Total reviews: {dataProduct.reviews.reviews.length}</Text>
                                </>) : null
                            }
                          </View>
                        </View>
                        
                      </View>
                      <Card borderRadius-5 enableShadow={true} row style={{ width: '100%', height: 50 }}>
                        <View style={{ width: '50%' }}>
                          <TouchableOpacity onPress={() => _share(dataProduct)}>
                            <Text style={{ textAlignVertical: 'center', paddingTop: 13, letterSpacing: .8, textAlign: 'center' }} enableBlur={true}>
                              <Fontisto name="share-a" color="#000" size={18} />
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{ width: '50%' }}>
                          <TouchableOpacity>
                            <Text style={{ letterSpacing: .8, textAlignVertical: 'center', paddingTop: 13, textAlign: 'center' }} enableBlur={true}>
                              <Fontisto name="favorite" color="#000" size={18} />
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </Card>
                      <View>
                        {/* Share */}

                        {/* keySpec */}
                        <View>
                          <Text marginT-10 marginB-15 marginL-7 style={{ fontSize: 16, fontFamily: 'AntDesign', fontWeight: 'bold', letterSpacing: 1 }}>Highlights :</Text>
                          <Card enableShadow={true} marginT-3 marginB-3>
                            <FlatList
                              data={productKeypoint}
                              renderItem={({ item }) => (
                                <View>
                                  <FlatList
                                    data={item.attribute}
                                    renderItem={({ item }) => _renderItem(item)}
                                    keyExtractor={(item, index) => index.toString()}
                                  />
                                </View>
                              )}
                              keyExtractor={(item, index) => index.toString()}
                            />
                            <TouchableOpacity onPress={() => _productSpec(dataProduct.attribute_groups, dataProduct.description, 1)}>
                              <Text style={{ textAlign: 'right', fontSize: 14, borderTopColor: '#aeb0b2', paddingTop: 10, paddingBottom: 10, borderTopWidth: 1, fontFamily: 'AntDesign', paddingRight: 10, fontWeight: 'bold', letterSpacing: 1 }}>
                                All Details  <AntIcon name="right" color="#000" size={14} />
                              </Text>
                            </TouchableOpacity>
                          </Card>
                        </View>
                        {/* pincode */}
                        <View>
                          <Card enableShadow={true} marginT-3 marginB-3>
                            <View row style={{ width: '96%' }}>
                              <View style={{ width: '60%' }}>
                                <TextInput
                                  onChangeText={Pincode => setPincode(Pincode)}
                                  // underlineColorAndroid="#FFFFFF"
                                  placeholder="Enter Pincode" //dummy@abc.com
                                  placeholderTextColor="#626875"
                                  keyboardType="numeric"
                                  blurOnSubmit={false}
                                />
                              </View>
                              <View style={{ width: '40%', justifyContent: 'center' }}>
                                <TouchableOpacity>
                                  <Text style={styles.buttonStyle}>Submit</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </Card>
                        </View>
                        {/* rate */}
                        <View>
                          {/* <ProgressBar progress={0.5} color={Colors.red800} /> */}
                          <View row style={{ width: '100%', display: 'flex' }}>

                            <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center' }}>
                              {/* <ProgressBar progress={0.5} color={Colors.red800} /> */}
                              <Text marginB-20 marginT-20 style={{ fontSize: 16, fontFamily: 'AntDesign', fontWeight: 'bold', textAlignVertical: 'center', letterSpacing: 1 }}>
                                Ratings & Reviews
                                      </Text>
                              <Text style={{ fontSize: 20, fontFamily: 'AntDesign', fontWeight: 'bold', letterSpacing: 1 }}>{dataProduct.rating} <AntIcon name="star" color="#000" size={18} /></Text>
                              <Text>{dataProduct.reviews.review_total} Reviews</Text>
                            </View>
                            <View style={{ justifyContent: 'center', width: '60%', }}>
                              <Text marginB-20 marginT-40 style={{
                                fontSize: 16, fontFamily: 'AntDesign', fontWeight: 'bold', letterSpacing: 1, textAlign: 'center',
                                textAlignVertical: 'center'
                              }}>
                                Rate product
                        </Text>
                              {
                                (ratingStar.length != 0) ? (
                                  // console.log(ratingStar, 'ratingStar'),
                                  <>
                                    <View marginB-65 style={{ width: '70%', justifyContent: 'center', marginLeft: 30 }}>
                                      <FlatList
                                        data={ratingStar}
                                        renderItem={({ item }) => {
                                          return (
                                            <View row style={{ width: '100%' }}>
                                              <Text style={{ width: '20%' }}>{item.star}</Text>
                                              {
                                                (item.percentage != 0) ?
                                                  (<>
                                                    <View style={{ width: '80%' }}>
                                                      < ProgressBar style={styles.progressZero} progress={item.percentage}
                                                        color={item.colorCode} />
                                                    </View>
                                                  </>) : (<>
                                                    <View style={{ width: '80%' }}>
                                                      < ProgressBar style={styles.progressZero} progress={item.percentage}
                                                        color='#808080' />
                                                    </View>
                                                  </>)
                                              }
                                            </View>
                                          )
                                        }}
                                        keyExtractor={(item, index) => index.toString()}
                                      />
                                    </View>
                                  </>) : (
                                    <>
                                      <View marginB-65 style={{ width: '70%', justifyContent: 'center', marginLeft: 30 }}>
                                        <FlatList
                                          data={['1', '2', '3', '4', '5']}
                                          renderItem={({ item }) => {
                                            return (
                                              <View row style={{ width: '100%' }}>
                                                <Text style={{ width: '20%' }}>{item}</Text>
                                                <View style={{ width: '80%' }}>
                                                  < ProgressBar style={styles.progressZero} progress={0}
                                                    color='#808080' />
                                                </View>
                                              </View>
                                            )
                                          }}
                                          keyExtractor={(item, index) => index.toString()}
                                        />
                                      </View>
                                    </>)
                              }
                            </View>
                            {/* <ProgressBar progress={0.5} color={Colors.red800} /> */}
                          </View>

                        </View>
                      </View>
                    </>
                  ) : <>
                      <View style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <ActivityIndicator size='large' />
                      </View>
                    </>
                }
              </View>
            </ScrollView>
            <View style={{}}>
              <View style={{
                width: '100%',
                height: 50,
                backgroundColor: '#FFF',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row'
              }}>
                <View style={{ width: '40%', justifyContent: 'center' }}>
                  <TouchableOpacity onPress={() => _addCartdata(dataProduct)}>
                    <Text style={[styles.buttonStyleaddcart, { backgroundColor: '#fff' }]}>Add Cart</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '50%', justifyContent: 'center' }}>
                  <TouchableOpacity onPress={_buyNow}>
                    <Text style={[styles.buttonStyle, { backgroundColor: '#3dc502' }]}>Buy Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>) : <>
            <View>
              < CatPlaceHolder />
            </View>

          </>
      }
    </View >
  )
}
productInfo.options = {
  topBar: {
    visible: false,
  }
}
export default productInfo;