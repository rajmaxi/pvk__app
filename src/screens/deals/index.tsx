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

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  YellowBox,
  TouchableOpacity, Dimensions, FlatList, Image
} from 'react-native';
import { dealsBannerImage, dealsBanner } from './dealsServices'
import { Navigation } from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import styles from './dealsStyle';
// import {  } from 'react-native-ui-lib';
console.disableYellowBox = true
export interface Props {
  name?: string;
  enthusiasmLevel?: number;
}
const deals: React.FC<Props> = (dealsProps: any) => {
  const dispatch = useDispatch();
  const [dealsDatas, setDealsDatas] = useState([]);
  const [dealsBannerImg, seDealsBannerImg] = useState('');
  const [dealsDatasHeading, setDealsDatasHeading] = useState([]);
  const [allData, setAlldata] = useState();
  const [selectedIndex, setSelectedIndex] = useState(() => { return 0 })
  useEffect(() => {
    fetchBook();
  }, [])
  const fetchBook = async () => {
    const dealsData = await dealsBannerImage();
    seDealsBannerImg(dealsData.data[0].image);
    const delasBanner = await dealsBanner();
    setDealsDatas(delasBanner.data.ZeroDownPayment);
    delasBanner.data.heading.unshift({ name: 'all deals', link: 'alldeals', id: '05' })
    setDealsDatasHeading(delasBanner.data.heading);
    setAlldata(delasBanner.data);
    console.log(delasBanner, 'delasBanner---------------');
    // console.log(delasBanner, ' dealsData');
  }
  const renderItem = async (item) => {
    return (
      <Text></Text>
    )
  }
  const _header = async (lnk: any, index: number) => {
    // console.log();
    setDealsDatas(allData[lnk]);
    setSelectedIndex(index)
  }
  return (
    <View>
      {/* <StatusBar translucent backgroundColor="transparent" /> */}
      <ScrollView style={{ backgroundColor: '#fff' }}>
        {
          (dealsBannerImg != '') ? (<>
            <View>
              <Image style={{ width: '100%', height: 200 }} resizeMode='stretch' source={{ uri: dealsBannerImg }} />
            </View>

          </>) : null
        }
        {
          (dealsDatasHeading.length != 0) ? (
            <>
              <FlatList
                data={dealsDatasHeading}
                numColumns={3}
                renderItem={({ item, index }) => {
                  // console.log(item);
                  return (
                    <View>
                      <TouchableOpacity onPress={() => _header(item.link, index)}>
                        <Text style={[styles.headingText, {
                          backgroundColor: index == selectedIndex
                            ? "#FF9800"
                            : "#000"
                        }]}>
                          {item.name}
                        </Text>

                      </TouchableOpacity>
                    </View>
                  )
                }}
                keyExtractor={item => item.id}
                onEndReachedThreshold={0.7}
              />
              {
                (dealsDatas.length != 0) ? (
                  <>
                    <FlatList
                      data={dealsDatas}
                      numColumns={2}
                      renderItem={({ item }) => {
                        return (
                          <View style={{ width: '50%', position: 'relative' }}>
                            <Image style={{ width: 150, height: 150, alignItems: 'center', paddingRight: 150 }} resizeMode='contain' source={{ uri: item.image }} />
                            <Image style={{ width: 50, height: 50, position: 'absolute', top: 0, right: 0 }} resizeMode='contain' source={{ uri: item.label_image }} />
                            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.textHead}>
                              {item.name}
                            </Text>
                            {
                              (item.price != '0.0000') ? (<>
                                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.textHead}>
                                  {item.price}
                                </Text>
                              </>) : null
                            }
                          </View>
                        )
                      }}
                      keyExtractor={item => item.banner_image_id}
                      onEndReachedThreshold={0.7}
                    />
                  </>) : null
              }
            </>
          ) : null
        }

      </ScrollView>
    </View>
  )
}
export default deals;
