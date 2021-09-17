import axios from "axios";
import {BACKEND_KEY, BACKEND_URL,DEV_MODE} from './config'
axios.defaults.headers.common['API-Authorization'] = BACKEND_KEY
export const get = (url) => {
     return new Promise((resolve,reject) => {
         axios({
             method: 'get',
             url: (DEV_MODE) ? '/api' + url : BACKEND_URL + url,
         }).then((result) => {
             resolve(result.data)
         }).catch((err) => {
             reject(err)
         })
     })
}
