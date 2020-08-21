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
const homeSkleton: React.FC<Props> = (props) => {
    // const sideMenu = (props: HelloProps) => {
    return (
        <View >
            <ScrollView>
                <SkeletonPlaceholder>
                    <View style={{ alignItems: "center" }}>
                        <View style={styles.slideBanner} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <View style={styles.catIcon}></View>
                        <View style={styles.catIcon}></View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <View style={styles.catIcon}></View>
                        <View style={styles.catIcon}></View>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <View style={styles.dealsBanner} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <View style={styles.mobileIcon}></View>
                        <View style={styles.mobileIcon}></View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <View style={styles.mobileIcon}></View>
                        <View style={styles.mobileIcon}></View>
                    </View>
                </SkeletonPlaceholder>
            </ScrollView>
        </View>

    )
}

export default homeSkleton;
const styles = StyleSheet.create({
    slideBanner: {
        width: 345,
        height: 200,
        marginTop: 5
    },
    catIcon: {
        width: 165,
        height: 15,
        marginTop: 10,
        marginRight: 8,
        marginLeft: 8
        // alignItems:'center'
    },
    dealsBanner: {
        width: 345,
        height: 60,
        marginTop: 5
    },
    mobileIcon: {
        width: 145,
        height: 200,
        marginTop: 10,
        marginRight: 8,
        marginLeft: 21
    }
});