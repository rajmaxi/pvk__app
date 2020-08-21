import axios from 'axios';

export const _getProductDetails = async (productId: number) => {
    // console.log('element', element);
    try {
        const { data: response } = await axios.get('https://appapinew.poorvikamobile.com/app/index.php?route=feed/rest_api/productdata&id=' + productId) //use data destructuring to get data from the promise object
        return response
    }
    catch (error) {
        console.log(error);
    }
}