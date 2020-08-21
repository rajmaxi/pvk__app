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
import React, { useState, Component, useEffect, useReducer } from 'react';
import { Dimensions, Image, SafeAreaView, StatusBar, ActivityIndicator, AsyncStorage, FlatList, ScrollView, TouchableOpacity, Alert, addons } from 'react-native';
import { Navigation } from "react-native-navigation";
import { useDispatch, useSelector } from "react-redux";
import styles from './styles'
import I18n from 'locale/i18n';
import { Colors, Typography, Spacings, Button, Modal, Card, Carousel, WheelPicker, Text, View, LoaderScreen } from 'react-native-ui-lib';
import { orange100 } from 'react-native-paper/lib/typescript/src/styles/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input'
import { navigatetoscreen } from "navigation/navigatetoscreen";
import Renderindicator from 'components/loaingoverlay'
import CustomHeader from '../../components/customheader';
import SimpleHeader from 'components/simpleheader'
import { removecartapi, updatecartquantity } from 'screens/productinfo/service'

const cart: cartproducttype = (cartproductprops): JSX.Element => {

  const [componentId, setcomponentId] = useState(cartproductprops.componentId);
  const [cartData, setCartData] = useState([]);
  const [enableback, setBack] = useState(cartproductprops.enableback);
  const [loading, setloading] = useState<boolean>(true)
  const [fav, setfav] = useState<boolean>(false)
  const [quantity, setquantity] = useState<number>(0)
  const [overlay, setOverlay] = useState<boolean>(false)

  const showloading = useSelector((state: boolean) => state.cartstate.showLoading)
  const cartitems = useSelector((state: cartItemState) => state.cartstate.cartItems);
  const favitems = useSelector((state: favItemState) => state.favouritestate.favItem)
  const login = useSelector((state: any) => state.loginstate.status)
  const dispatch = useDispatch()
  const loadNumber = useSelector((state: cartItemState) => state.cartstate.loadingNumber);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  //get item from cart redux
  const Getitems = async () => {
    setloading(false)
    //Alert.alert('--->>>'+cartproductprops.title)
  }

  useEffect(() => {
    if (cartitems.length > 0) {
      Navigation.mergeOptions(componentId, {
        bottomTab: {
          badge: '' + cartitems.length
        },
      });
    }
    else
      Navigation.mergeOptions(componentId, {
        bottomTab: {
          badge: ''
        },
      });
    // AsyncStorage.removeItem('cartData');
    // var addedItems = AsyncStorage.getItem('cartData');
    // Alert.alert("null", addedItems)
    // if (addedItems != null) {
    //   Alert.alert("null not", addedItems)
    //   var cartStrng = JSON.parse(addedItems);
    //   console.log(cartStrng, 'addedItems addedItems');
    //   dispatch({ type: 'ADDTOCART', payload: cartStrng })
    // }
    fetchCart();
  }, [loadNumber]);
  const fetchCart = async () => {
    console.log('fetchCart', cartitems, cartitems.length);
    if (loadNumber > 1) {
      console.log('chk');

      console.log('fetchCart1');
      // await AsyncStorage.removeItem('cartData');
      console.log(cartitems, 'cartitems cartitems');
      let cartString = JSON.stringify(cartitems)
      await AsyncStorage.setItem('cartData', cartString);
    }
    else {
    }
  }
  const _clearLocal = async () => {
    console.log(AsyncStorage.getItem('cartData'));
    try {
      await AsyncStorage.removeItem('cartData');
      return true;
    }
    catch (exception) {
      return false;
    }
  }
  const _removeCart = (item: any) => {
    console.log('_removeCart', item);
    dispatch({ type: 'REMOVECART', removeId: item.key, numbersChange: Math.floor(Math.random() * (1000 - 100 + 1)) + 100 })
  }
  const _addFavorite = (item: any) => {
    console.log('favorite', item);
  }
  const _updateQuantity = (element, quantity) => {
    var indexFind = cartitems.findIndex(changeQuty => changeQuty.key == element.key);
    var findQty = cartitems.find(changeQuty => changeQuty.key == element.key);
    findQty['quantity'] = quantity;
    dispatch({ type: 'UPDATE_CART', numbersChange: Math.floor(Math.random() * (1000 - 100 + 1)) + 100, dataItems: findQty })
    console.log('favorite', cartitems, findQty, indexFind);
    forceUpdate();
  }
  const _renderItem = (element: cartItemState) => {
    return (
      <View row flex style={{ width: '100%' }}>
        <View style={{ width: '30%' }}>
          <Image style={{ width: 100, height: 100 }} resizeMode='contain' source={{ uri: element.image }} />
        </View>
        <View style={{ width: '70%' }}>
          <Text>
            {element.name}
          </Text>
          <View >
            {
              (element.special) ? (<>
                <Text>
                  Special: {element.special_formated}
                  <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>
                    Price: {element.price_formated}
                  </Text>
                </Text>
              </>) : (<>
                <Text style={{}}>
                  Price: {element.price_formated}
                </Text>
              </>)
            }
          </View>
          <View>
            <NumericInput
              value={parseInt(element.quantity)}
              onChange={quantity => {
                _updateQuantity(element, quantity)
              }
              }
              // onLimitReached={(isMin, msg) => console.log(isMin, msg)}
              totalWidth={100}
              totalHeight={30}
              iconSize={15}
              minValue={1}
              maxValue={8}
              valueType="real"
              rounded editable={true}
              textColor='gray'
              iconStyle={{ color: "grey" }}
              rightButtonBackgroundColor="white"
              leftButtonBackgroundColor="white"
            />
          </View>
          <View row marginT-5 style={{ width: '100%' }}>

            <View style={{ width: '50%' }}>
              <TouchableOpacity onPress={() => { _removeCart(element) }}>
                <View row>
                  <AntDesign name="delete" color="#d4cece" size={25} />
                  <Text marginL-5 marginT-3>Remove</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ width: '50%' }}>
              <TouchableOpacity onPress={() => { _addFavorite(element) }}>

                <View row>
                  <Fontisto name="favorite" color="#d4cece" size={25} />
                  <Text marginL-5 marginT-3>Favorite</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
  return (
    <View style={{ backgroundColor: '#fff' }}>
      <CustomHeader componentId={cartproductprops.componentId} title='Cart'></CustomHeader>
      <ScrollView>
        <View>
          {
            (cartitems.length != 0) ? (<>
              <View>
                <FlatList
                  data={cartitems}
                  renderItem={({ item }) => _renderItem(item)}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
              {/* <View>
                <Text>
                  {cartitems.length}
                </Text>
              </View> */}
            </>) : (<>
              <Text>
                Loading
              </Text>
            </>)
          }
        </View>
      </ScrollView>
    </View>

  )
  // check total of the cart Items quantity

}
cart.options = {
  topBar: {
    visible: false,
  }
}
export default cart

