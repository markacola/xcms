
const debug = require('debug')

import assert from 'assert'
import Emitter from 'events'

export default class Packet extends Emitter {

  constructor({type, ...props} = {}) {
    assert(type, 'packet type required')
    super()

    Object.assign(this, {type, ...props})
  }

}
