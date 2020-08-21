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
interface cartproductprops {
    componentId: string;
    enableback: false,
}
type cartItemState = {
    id: string
    price: string,
    name: string;
    image: string,
    by: string,
    quantity: string,
    key: string,
    special: boolean,
    special_formated: string,
    price_formated: string
}
type cartproducttype = NavigationComponent<cartproductprops>;