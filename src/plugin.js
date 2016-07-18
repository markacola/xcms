
const debug = require('debug')

import assert from 'assert'
import Emitter from 'events'

export default class Plugin extends Emitter {

  constructor({name, handles = [], ...opt} = {}) {
    assert(name, 'plugin name required')
    super()

    Object.assign(this, {name, handles, ...opt})
    this.debug = debug(`xcms:plugin:${name}`)
  }

  onMount(app) {}

  onUnmount(app) {}

  consumePacket(packet) {}

  canHandlePacket({type}) {
    let {handles} = this
    return (
      (handles === type)
      || (handles instanceof Set && handles.has(type))
      || (handles instanceof RegExp && handles.test(type))
    )
  }

}
