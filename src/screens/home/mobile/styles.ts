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
import { StyleSheet } from 'react-native';
const catestylesheet = StyleSheet.create({
  container1: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
    width: '100%'
  },
  smartphone : {
    width: '100%',
    height: 120,
    margin: 'auto',
  },
  category__title : {
    display :'flex',
    flexBasis: '33%',
    flexDirection: 'row',
    borderRightColor: '#333',
    borderRightWidth: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  category__title__inner : {
    display :'flex',
    flexDirection: 'row'
  },
  compare__list: {
    position: 'absolute',
    top: 50,
    left: 10,
    backgroundColor: '#fff',
    padding: 4,
    fontSize: 11,
    borderRadius: 4,
    letterSpacing: 0.5
  },
  addedPro__list: {
    position: 'absolute',
    top: 50,
    left: 10,
    backgroundColor: '#ff9000',
    padding: 4,
    fontSize: 11,
    borderRadius: 4,
    letterSpacing: 0.5
  },
  compare__grid: {
    position: 'absolute',
    top: 50,
    left: 25,
    backgroundColor: '#fff',
    padding: 7,
    fontSize: 12,
    borderRadius: 4,
    marginTop: 25,
    letterSpacing: 0.5
  },
  addedPro__grid: {
    position: 'absolute',
    top: 50,
    left: 25,
    marginTop: 25,
    backgroundColor: '#ff9000',
    padding: 7,
    fontSize: 12,
    borderRadius: 4,
    letterSpacing: 0.5
  }
})
export default catestylesheet 