import AsyncStorage from "@react-native-community/async-storage";

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
export interface cartitemstate {
  showLoading: boolean;
  cartItem: Array<cartItemState>;
  cartItems: Array<cartItemState>;
  loading: boolean,
  loadingNumber: number
}
export const initialState: cartitemstate = {
  cartItem: [],
  cartItems: [],
  showLoading: false,
  loading: false,
  loadingNumber: 1
};

/*Define Reducer*/
const cartstate = (state = initialState, action: any) => {
  console.log(action);

  switch (action.type) {
    case 'loading':
      //Think its not used
      return {
        ...state,
        showLoading: true,
      }
    case 'show':
      return {
        ...state,
        loading: true,
      }
    case 'addtocart':
      // Append items to the cart
      // Set loading false
      return {
        ...state,
        cartItem: [...state.cartItem, action.item],
        loading: false,
      }
    case 'ADDTOCART':
      // Append items to the cart
      // Set loading false
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        loadingNumber: (action.numbersChange != undefined) ? action.numbersChange : 1,
      }
    case 'REMOVECART':
      // Append items to the cart
      // Set loading false
      return {
        ...state,
        cartItems: [...state.cartItems.filter((item) => item.id !== action.removeId)],
        loadingNumber: (action.numbersChange != undefined) ? action.numbersChange : 1,
      }
    case 'UPDATE_CART':
      // Append items to the cart
      // Set loading false
      return {
        ...state,
        cartItems: state.cartItems.map(
          (content, i) => content.key == action.dataItems.key ? { ...content, quantity: action.dataItems.quantity }
            : content
        ),
        loadingNumber: (action.numbersChange != undefined) ? action.numbersChange : 1,
      }

    case 'removeallcart':
      // Remove All-items from the cart
      // Set loading false
      return {
        ...state,
        cartItem: [],
        loading: false,
      }
    case 'removefromcart':
      // Remove items from the cart by item.id
      // Set loading false
      return {
        ...state,
        cartItem: [...state.cartItem.filter(cartItem => cartItem.id != action.item.id)],
        loading: false,
      }
    case "updatequantity":
      // Update cart item quantity by item.id
      // Set loading false
      return {
        ...state,

        cartItem: state.cartItem.map(item =>
          item.id === action.item.id ? { ...item, quantity: action.item.quantity } : item
        ),
        showLoading: false,
        loading: false,
      };
  }
  return state
}
export default cartstate;