const orderService = require('./orderService')

module.exports = {
  postOrder,
}

async function postOrder(req, res) {
  try {
    const order = req.body
    const updatedOrder = await orderService.postOrder(order)
    res.json(updatedOrder)
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: 'couldnt Post order' })
  }
}
