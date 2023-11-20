'use strict'

import _decompress from './build/decompress_binding.js'

export async function decompress(buffer) {
  const exports = await _decompress()
  const result = await exports.decompress(buffer)
  if (result === false) throw new Error('ConvertWOFF2ToTTF failed')
  return result
}
