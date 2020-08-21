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
import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
} from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
console.disableYellowBox = true
export interface Props {
    name?: string;
    enthusiasmLevel?: number;
}
const catSkleton: React.FC<Props> = (props) => {
    // const sideMenu = (props: HelloProps) => {
    const num = ["1", "1", "1", "1"];
    return (
        <View >
            <ScrollView>
                {
                    num.map((element, i) => {
                        return (
                            <View key={i}>
                                <SkeletonPlaceholder>
                                    <View style={{ flexDirection: 'row', alignItems: "center", width: '100%', display: 'flex' }}>
                                        <View style={styles.mobileList}></View>
                                        <View style={{ margin: 0 }}>
                                            <View style={[styles.catIcon, { width: 250, margin: 0 }]}></View>
                                            <View style={[styles.catIcon, { width: 200, margin: 0 }]}></View>
                                            <View style={[styles.catIcon, { width: 150, margin: 0 }]}></View>
                                        </View>
                                    </View>
                                </SkeletonPlaceholder>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>

    )
}

export default catSkleton;
const styles = StyleSheet.create({
    mobileList: {
        width: 120,
        height: 150,
        marginTop: 5,
    },
    contentList: {
        width: 300,
        height: 150,
        marginRight: 8,
        marginLeft: 8,
        // alignItems:'center'
    },
    catIcon: {
        height: 15,
        marginTop: 5,
        marginRight: 8,
        marginLeft: 8
        // alignItems:'center'
    },
});