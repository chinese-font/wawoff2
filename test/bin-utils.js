'use strict'

import { equal } from 'assert'

import { swap_ext } from '../bin/utils.js'

describe('swap_ext', function () {
  it('swaps .ttf suffix with .woff2', () => {
    equal(swap_ext('font.ttf', '.ttf', '.woff2'), 'font.woff2')
  })

  it('suffixes with .woff2', () => {
    equal(swap_ext('font', '.ttf', '.woff2'), 'font.woff2')
  })

  it('suffixes with .woff2 anyway', () => {
    equal(swap_ext('font.otf', '.ttf', '.woff2'), 'font.otf.woff2')
  })
})
