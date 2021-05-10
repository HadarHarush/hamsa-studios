module.exports = {
  makeId,
  getPriceByBlock,
}

function getPriceByBlock(block) {
  let price = 0
  if (block.size === '1010') price += 25
  if (block.size === '1015') price += 30
  if (block.size === '1520') price += 50
  if (block.size === '2030') price += 100
  if (block.color === 'hot' || block.color === 'white') price += 2
  return price
}

function makeId(length = 5) {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}
