
const debug = require('debug')

import assert from 'assert'
import Emitter from 'events'
import Packet from './packet'

export default class Plugin extends Emitter {

  constructor({name, handles = new Set(), ...opt}) {
    assert(name, 'plugin name required')
    super()

    Object.assign(this, {name, handles, ...opt})
    this.debug = debug(`xcms:plugin:${name}`)
  }

  emit(...args) {
    if (args[0] instanceof Packet) {
      return super.emit('packet', ...args)
    }
    super.emit(...args)
  }

  canHandlePacket({type}) {
    let {handles} = this
    return (
      (handles === type)
      || (handles instanceof Set && handles.has(type))
      || (handles instanceof RegExp && handles.test(type))
    )
  }

  consumePacket(packet) {}

  canHandlePacketEcho = () => false

  consumePacketEcho(echo) {}

  onMount(app) {}

  onUnmount(app) {}

}
