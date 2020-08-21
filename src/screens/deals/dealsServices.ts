import axios from 'axios';
// import { api } from '../../../screens/components/apiLink'

export const dealsBanner = async () => {
    try {
        const { data: response } = await axios.get('https://www.poorvikamobile.com/output/productdealsbanner.json') //use data destructuring to 
        return response
    }
    catch (error) {
        console.log(error);
    }
}
export const dealsBannerImage = async () => {
    try {
        const { data: response } = await axios.get('https://appapinew.poorvikamobile.com/app/index.php?route=feed/rest_api/dealsBannerImage') //use data destructuring to 
        return response
    }
    catch (error) {
        console.log(error);
    }
}
