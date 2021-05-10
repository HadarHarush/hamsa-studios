import axios from 'axios'

export const uploadImgFromFile = async (ev) => {
  // Defining our variables
  const UPLOAD_PRESET = 'instagram_unsigned' // Insert yours
  const CLOUD_NAME = 'hadarush100' // Insert yours
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const FORM_DATA = new FormData()
  // Building the request body
  FORM_DATA.append('file', ev.target.files[0])
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)
  console.log('FORM_DATA:', FORM_DATA)
  // Sending a post method request to Cloudniarys' API
  try {
    const res = await axios.post(UPLOAD_URL, FORM_DATA)
    return res.data
  } catch (err) {
    console.error('ERROR!', err)
  }
}

export const uploadImgFromDataUri = async (dataUri) => {
  // Defining our variables
  const UPLOAD_PRESET = 'instagram_unsigned' // Insert yours
  const CLOUD_NAME = 'hadarush100' // Insert yours
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const FORM_DATA = new FormData()
  // Building the request body
  FORM_DATA.append('file', dataUri)
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)
  console.log('FORM_DATA:', FORM_DATA)
  // Sending a post method request to Cloudniarys' API
  try {
    const res = await axios.post(UPLOAD_URL, FORM_DATA)
    return res.data
  } catch (err) {
    console.log('hey, bad request!')
    console.error('ERROR!', err)
    throw err
  }
}
