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

import React, { useState, useEffect, useReducer } from 'react';
import I18n from 'locale/i18n';
import { ActivityIndicator, Alert, SafeAreaView, FlatList, AsyncStorage, TouchableOpacity, } from 'react-native';
import _ from 'lodash';
import { useDispatch, useSelector } from "react-redux";
import { Colors, Typography, Spacings, Button, Toast, Card, Image, Carousel, Text, View, LoaderScreen, ActionSheet } from 'react-native-ui-lib';
import ConnectionStatusBar from 'components/connectionstatusbar'
import { Navigation } from "react-native-navigation"
import { categoryMain, } from './service'
import StarRating from 'react-native-star-rating';
import styles from './styles'
import CatPlaceHolder from '../../../components/catPagePlaceholder';
import CustomHeader from '../../../components/customheader';
import smartphoneImages from 'constants/images';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

var value: string = ''
const mobile: mobiletypes = (mobileprops) => {
  /*Define State, Function, use Redux*/
  const [showNative, setshowNative] = useState(() => { return false });
  const [sortName, setSortName] = useState('');
  const [showCustomIcons, setshowCustomIcons] = useState(() => { return false });
  const dispatch = useDispatch();
  // const newcount = useSelector(state => state.apiReducer.catReducer.data);
  const [filterData, setFilterData] = useState([]);//0
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [isLoad, setIsLoad] = useState(() => { return false });
  const [count, setCount] = useState();
  const [datamainState, setDatamainState] = useState([]);
  const [dataMain, setDataMain] = useState([]);
  const [compareButton, setCompareButton] = useState(() => { return false });
  const [listDrid, setListDrid] = useState(() => { return true });
  const [page, setPage] = useState(() => { return 1 });
  useEffect(() => {
    fetchBooks();
  }, [page, sortName]);
  const fetchBooks = async () => {
    let a = [] as any;
    console.log('hit check');
    a = await categoryMain(mobileprops.id, page, sortName);
    console.log('value of catpage', a);
    if (page == 1) {
      if (a.data.length != 0) {
        a.data.forEach((item: any) => {
          item["activeclass"] = false;
          if (item.special) {
            let perValue1 = item.price - item.special;
            let perValue12 = perValue1 / item.price;
            let perValue = perValue12 * 100;
            item["PercenDage"] = Math.round(perValue) + "%";
          }
        });
        setDatamainState(a.data)
      }
    }
    else {
      if (a.data.length != 0) {
        console.log('if')
        a.data.forEach((item: any) => {
          item["activeclass"] = false;
          if (item.special) {
            let perValue1 = item.price - item.special;
            let perValue12 = perValue1 / item.price;
            let perValue = perValue12 * 100;
            item["PercenDage"] = Math.round(perValue) + "%";
          }
        });
        setDatamainState([...datamainState, ...a.data]);
        // setIsLoad(false);
      } else {
        console.log('else');
      }
    }
  }
  const loadMoreCommit = async () => {
    console.log('loadMoreCommit Hit');
    setPage(prevpage => prevpage + 1);
    setIsLoad(true);
  };
  const comparePress = () => {
    console.log("element item");
    let a = (compareButton) ? false : true;
    console.log(a);
    setCompareButton(prevCompareButton => prevCompareButton = a)
  }
  const compareAdd = (e: any) => {
    var a = [] as any, filteredList = [] as any;
    // var a:string[] = [] 
    //const result:any[] = []
    filteredList = datamainState.filter((item: any) => item.id == e.id);
    //console.log('a length', filterData.length); //0
    if (filterData.length < 2) {
      console.log('if');
      filteredList.forEach((item: any) => item["activeclass"] = true);
      a = datamainState.filter((item: any) => item.activeclass == true)
      setFilterData(a)
    } else {
      console.log('else');
    }
    console.log('compareAdd a', a);
    forceUpdate();
  }
  const compareRemove = (e: any) => {
    // console.log("compareRemove", e);
    let filteredList = datamainState.filter((item: any) => item.id === e.id);
    filteredList.forEach((item: any) => item["activeclass"] = false);
    let a = datamainState.filter((item: any) => item.activeclass == true);
    console.log('remove a', a);
    setFilterData(a);
    forceUpdate();
  }
  const compareConfirm = () => {
    console.log("compareConfirm");
    Navigation.push(mobileprops.componentId, {
      component: {
        id: 'comparePageID',
        name: 'comparePage',
        passProps: {
          paramsValue: filterData
        }, options: {
          bottomTabs: {
            visible: false,
            drawBehind: true
          }
        }
      }
    });
  }
  const _productInfoPage = (element: { id: string }) => {
    console.log('_productInfoPage', element);
    Navigation.push(mobileprops.componentId, {
      component: {
        id: 'productinfoID',
        name: 'productinfo',
        passProps: {
          id: element.id
        }, options: {
          bottomTabs: {
            visible: false,
            drawBehind: true
          }, topBar: {
            visible: false,
            drawBehind: true
          }
        }
      }
    });
  }
  const renderItem = (item: any) => {
    // console.log("item", item);
    return (
      <View style={{ flex: 1, position:'relative'}} >
        {
          (listDrid) ? (<>
            <View flex row style={{backgroundColor:'#f9f9f9'}}>
              <View flex row style={{marginBottom:15,backgroundColor:'#fff',padding:10,borderWidth:1,borderRadius:12,borderColor:'#fff'}}>
                <TouchableOpacity onPress={() => _productInfoPage(item)} style={{flexBasis:'35%'}}>
                  <Image style={{ width: 100, height: 160 }} resizeMode='contain' source={{ uri: item.image }} />
                </TouchableOpacity>
                {
                  (compareButton) ? (
                    <>
                      {
                        (!item.activeclass) ? (
                          <>
                            <View style={styles.compare__grid}>
                              <TouchableOpacity onPress={() => compareAdd(item)}>
                                <Text>
                                  Compare
                                                    </Text>
                              </TouchableOpacity>
                            </View>
                          </>) : (
                            <>
                              <View style={styles.addedPro__grid}>
                                <TouchableOpacity onPress={() => compareRemove(item)}>
                                  <Text style={{ backgroundColor: '#ff9000', color: '#fff', marginLeft: 10, marginRight: 10 }} >
                                    Added
                                                        </Text>
                                </TouchableOpacity>
                              </View>
                            </>)
                      }
                    </>
                  ) : null
                }
              <TouchableOpacity onPress={() => _productInfoPage(item)} style={{flexDirection:'column',alignItems:'center',justifyContent:'center',display:'flex',marginLeft:10}}>
                <View style={{flexBasis:'65%'}}>
                  <Text style={{fontSize:18,marginBottom:12,width:200}}>{item.name}</Text>
                  <Text style={{fontSize:16,marginBottom:12}}>By:{item.manufacturer}</Text>
                  {

                    (item.special) ? (<>
                      <Text style={{ color: '#f1840f', fontSize: 14 }}>{item.special_formated}</Text>
                      <Text style={{ color: '#bfbcba', fontSize: 12 }}>{item.price_formated}</Text>
                      <Text style={{ color: '#f1840f', fontSize: 18 }}>
                        {item.PercenDage}
                      </Text>

                    </>) : (<>
                      <Text style={{ color: '#f1840f', fontSize: 14 }}>{item.price_formated}</Text>
                    </>)
                  }
                  <View style={{marginTop:15,width:100}}>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={item.rating}
                      fullStarColor='gray'
                      starSize={15}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              </View>
            </View>
          </>) : (<>
            <View flex row style={{backgroundColor:'#f9f9f9'}}>
              <View flex row style={{flexBasis:"48%",marginRight:10,marginBottom:15,backgroundColor:'#fff',padding:10,borderWidth:1,borderRadius:12,borderColor:'#fff'}}>
              <TouchableOpacity onPress={() => _productInfoPage(item)}>
                <Image style={{ width: 60, height: 120}} resizeMode='contain' source={{ uri: item.image }} />
              </TouchableOpacity>
              {
                (compareButton) ? (
                  <>
                    {
                      (!item.activeclass) ? (
                        <>
                          <View style={styles.compare__list}>
                            <TouchableOpacity onPress={() => compareAdd(item)}>
                              <Text>
                                Compare
                                                    </Text>
                            </TouchableOpacity>
                          </View>
                        </>) : (
                          <>
                            <View style={styles.addedPro__list}>
                              <TouchableOpacity onPress={() => compareRemove(item)}>
                                <Text style={{ backgroundColor: '#ff9000', color: '#fff', marginLeft: 10, marginRight: 10 }} >
                                  Added
                                                        </Text>
                              </TouchableOpacity>
                            </View>
                          </>)
                    }
                  </>
                ) : null
              }
            <TouchableOpacity onPress={() => _productInfoPage(item)} style={{flexDirection:'column',alignItems:'center',justifyContent:'center',display:'flex',marginLeft:10}}>
              <View>
                <Text style={{fontSize:12,width:100,marginBottom:8}}>{item.name}</Text>
                {/* <Text>By:{item.manufacturer}</Text> */}
                {
                  (item.special) ? (<>
                    <Text style={{ color: '#f1840f', fontSize: 14 }}>{item.special_formated}</Text>
                    <Text style={{ color: '#bfbcba', fontSize: 12 }}>{item.price_formated}</Text>
                    <Text style={{ color: '#f1840f', fontSize: 18 }}>
                      {item.PercenDage}
                    </Text>

                  </>) : (<>
                    <Text style={{ color: '#f1840f', fontSize: 14 }}>{item.price_formated}</Text>
                  </>)
                }
                <View style={{marginTop:8}}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={item.rating}
                    fullStarColor='gray'
                    starSize={15}
                  />
                </View>
              </View>
            </TouchableOpacity>
            </View>
            </View>
          </>)
        }
      </View>
    )
  }
  const openAction = () => {
    setshowNative(true);
  }
  const _chnageView = () => {
    (listDrid) ? setListDrid(false) : setListDrid(true);
  }
  const _onDismissModel = () => {
    console.log('_onDismissModel');
    setshowNative(false);
  }
  const pickOption = (value: any) => {
    // console.log(value);
    switch (value) {
      case '1':
        setSortName('&sort=pd.name&order=ASC')
        setPage(1);
        break;
      case '2':
        setSortName('&sort=pd.name&order=DESC')
        setPage(1);
        break;
      case '3':
        setSortName('&sort=p.price&order=DESC')
        setPage(1);
        break;
      case '4':
        setSortName('&sort=p.price&order=ASC')
        setPage(1);
        break;
      case '5':
        setSortName('&sort=rating&order=DESC')
        setPage(1);
        break;
      case '6':
        setSortName('&sort=rating&order=ASC')
        setPage(1);
        break;
      default:
        setSortName('')
        setPage(1);
    } 
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff',position:'relative'}}>
      <CustomHeader componentId={mobileprops.componentId} title='Mobiles' />
      {/* <Image style={styles.smartphone} resizeMode='contain' source={smartphoneImages.smartphone}></Image> */}
      <View>
        <ActionSheet
          title='SORT BY'
          message='SORT ORDER'
          destructiveButtonIndex={0}
          options={[
            { label: 'Default', onPress: () => pickOption('0') },
            { label: 'Name (A-Z)', onPress: () => pickOption('1') },
            { label: 'Name (Z-A)', onPress: () => pickOption('2') },
            { label: 'Price-High to Low', onPress: () => pickOption('3') },
            { label: 'Price-Low to High', onPress: () => pickOption('4') },
            { label: 'Rating (Highest)', onPress: () => pickOption('5') },
            { label: 'Rating (Lowest)', onPress: () => pickOption('6') },
            // { label: 'cancel', onPress: () => pickOption('cancel') },
          ]}
          visible={showNative}
          onDismiss={_onDismissModel}
        />
      </View>
      {
        (datamainState.length != 0) ? (
          <>
            <View style={{ backgroundColor: '#f9f9f9',flex: 1, position: 'relative'}}>
              <View style={{ width: '100%', flexDirection: 'row', backgroundColor: '#f9f9f9', height: 40, alignItems: 'center', justifyContent:'center',padding: 0,marginBottom:12}}>
                <View style={[styles.category__title]}>
                  <TouchableOpacity onPress={comparePress} style={styles.category__title__inner}>
                    <MaterialCommunityIcons name="compare" size={20} color={'gray'} style={{marginRight:8}}/>
                    <Text style={[(compareButton) ? { color: '#ff9000' } : { color: '#000' }]}>
                      Compare
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.category__title]}>
                 <TouchableOpacity onPress={openAction} style={styles.category__title__inner}>
                    <MaterialCommunityIcons name="sort" size={20} color={'gray'} style={{marginRight:8}}/>
                    <Text style={{ textAlign: 'center' }}>
                      Sort
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.category__title, { borderWidth: 0, borderRightColor: 'transparent' }]}>
                  <TouchableOpacity onPress={_chnageView} style={styles.category__title__inner}>
                    {
                      (listDrid) ? (<>
                        <Entypo name="grid" color="#7A7970" size={25} />
                      </>) : (<>
                        <Entypo name="list" color="#7A7970" size={25} />
                      </>)
                    }
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                {
                  (listDrid) ? (
                    <>
                      <FlatList
                        data={datamainState}
                        renderItem={({ item }) => renderItem(item)}
                        keyExtractor={(item, index) => {
                          return index.toString();
                        }}
                        //infinityScroll
                        ListFooterComponent={() => {
                          return (
                            <View marginB-50>
                              <ActivityIndicator size='large' />
                              <Text normalText>Loading Items</Text>
                            </View>
                          )
                        }}
                        onEndReached={loadMoreCommit}
                        onEndReachedThreshold={0.7}
                        //lazyLoad
                        removeClippedSubviews={true} // Unmount components when outside of window 
                        initialNumToRender={10} // Reduce initial render amount
                        maxToRenderPerBatch={1} // Reduce number in each render batch
                        updateCellsBatchingPeriod={100} // Increase time between renders
                        windowSize={7} // Reduce the window size
                      />
                    </>) : (<>
                      {/* //false */}
                      <FlatList
                        numColumns={2}
                        horizontal={false}
                        key={2}
                        data={datamainState}
                        renderItem={({ item }) => renderItem(item)}
                        keyExtractor={(item, index) => {
                          return index.toString();
                        }}
                        //infinityScroll
                        ListFooterComponent={() => {
                          return (
                            <View marginB-50>
                              <ActivityIndicator size='large' />
                              <Text normalText>Loading Items</Text>
                            </View>
                          )
                        }}
                        onEndReached={loadMoreCommit}
                        onEndReachedThreshold={0.7}
                        //lazyLoad
                        removeClippedSubviews={true} // Unmount components when outside of window 
                        initialNumToRender={10} // Reduce initial render amount
                        maxToRenderPerBatch={1} // Reduce number in each render batch
                        updateCellsBatchingPeriod={100} // Increase time between renders
                        windowSize={7} // Reduce the window size
                      />
                    </>)
                }
              </View>
              <View style={{position:'absolute',bottom:0, alignSelf: 'flex-end', width: '100%'}}>
                {
                  (filterData.length == 1) ? (
                    <>
                      <View style={{backgroundColor: "lightgray",height: 35, alignItems: 'center',marginTop:7}}>
                        <Text style={{color:'#1b1b1b',marginTop:5}}>Please select another one product</Text>
                      </View>
                    </>) : null
                }
                {
                  (filterData.length > 1) ? (
                    <>
                    <View>
                      <TouchableOpacity onPress={compareConfirm}>
                        <View style={{ backgroundColor: "#ff9000", height: 35, alignItems: 'center', paddingTop: 4,marginTop:7}}>
                          <Text style={{color:'#fff'}}>Compare Now</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    </>) : null
                }
              </View>
            </View>
          </>) : <CatPlaceHolder />
      }
    </SafeAreaView>
  )
};
export default mobile;