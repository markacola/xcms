
const debug = require('debug')('xcms:app')

import {UnhandledPacketError} from './errors'
import assert from 'assert'
import Emitter from 'events'
import Plugin from './plugin'
import Packet from './packet'

export {
  Plugin,
  Packet
}

export default class App extends Emitter {

  constructor(opt = {}) {
    super()

    Object.assign(this, opt)
    this.plugins = new Set()
  }

  use(...plugins) {
    for (let plugin of plugins) {
      if (!(plugin instanceof Plugin)) throw new TypeError('plugin must extend xcms.Plugin!')
      debug(`registered ${plugin.name}`)
      this.wirePlugin(plugin)
      plugin.onMount(this)
    }
    return this
  }

  unuse(...plugins) {
    for (let plugin of plugins) {
      if (!(plugin instanceof Plugin)) throw new TypeError('plugin must extend xcms.Plugin!')
      debug(`deregistered ${plugin.name}`)
      this.unwirePlugin(plugin)
    }
    return this
  }

  wirePlugin(plugin) {
    this.plugins.add(plugin)
    plugin.on('packet', this.handlePacket.bind(this))
    plugin.onMount(this)
  }

  unwirePlugin(plugin) {
    this.plugins.delete(plugin)
    plugin.removeListener('packet', this.handlePacket.bind(this))
    plugin.onUnmount(this)
  }

  handlePacket(packet) {
    if (!(packet instanceof Packet)) throw new TypeError('packet must extend xcms.Packet!')
    debug(`handled packet: ${packet.type}`)
    for(let plugin of this.plugins) {
      if (plugin.canHandlePacket(packet)) {
        return plugin.consumePacket(packet)
      }
    }
    throw new UnhandledPacketError(`unhandled packet. type: ${packet.type}`)
  }

}
