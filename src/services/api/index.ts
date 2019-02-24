import ENV from 'react-native-config'
import Geocoding from './geocoding'

console.log(ENV)

const baseUrl = ENV.GOOGLE_BASE_URL
const key = ENV.GOOGLE_APP_KEY

export const geocoding = new Geocoding(baseUrl, key)
