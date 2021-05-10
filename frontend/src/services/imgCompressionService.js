import { httpService } from './httpService'

export const imgCompressionService = {
  getCompressedImgData,
}

async function getCompressedImgData(srcData) {
  try {
    return await httpService.post('img-compression', { srcData })
  } catch (err) {
    console.log('error while trying to send compress img: ', err)
  }
}
