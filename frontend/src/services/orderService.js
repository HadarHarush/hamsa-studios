import { httpService } from './httpService'

export const orderService = {
  sendOrder,
}

async function sendOrder(order) {
  try {
    return await httpService.post('order', order)
  } catch (err) {
    console.log('error while trying to send order: ', err)
  }
}
