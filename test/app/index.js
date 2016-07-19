import sinon from 'sinon'
import assert from 'assert'

import App, {Plugin, Packet} from '../../src/app'
import {UnhandledPacketError} from '../../src/errors'

describe('App', () => {
  let app, plugin, packet, unhandledPacket

  beforeEach(() => {
    app = new App()
    plugin = new Plugin({name: 'test', handles: 'test-packet'})
    packet = new Packet({type: 'test-packet'})
    unhandledPacket = new Packet({type: 'unhandled-packet'})
  })

  describe('constructor', () => {

    it('should apply opts to app', () => {
      let app = new App({name: 'my-test-app', someOption: true})
      app.name.should.equal('my-test-app')
      app.someOption.should.be.true()
    })

  })

  describe('use', () => {

    it('should register new plugin', () => {
      app.use(plugin)
      app.plugins.has(plugin).should.be.true()
    })

    it('should throw a type error', () => {
      (() => {
        app.use('not a plugin')
      }).should.throw(TypeError)
    })

  })

  describe('unuse', () => {

    it('should deregister plugin', () => {
      app.use(plugin)
      app.unuse(plugin)
      app.plugins.has(plugin).should.be.false()
    })

    it('should throw a type error', () => {
      (() => {
        app.unuse('not a plugin')
      }).should.throw(TypeError)
    })

  })

  describe('handlePacket', () => {

    it('should handle packet', () => {
      let spy = sinon.spy(app, 'handlePacket')
      app.use(plugin)
      plugin.emit('packet', packet)

      spy.calledOnce.should.be.true()
    })

    it('should throw type error', () => {
      (() => {
        app.use(plugin)
        plugin.emit('packet', 'not a packet')
      }).should.throw(TypeError)
    })

    it('should throw UnhandledPacketError', () => {
      (() => {
        app.use(plugin)
        plugin.emit('packet', unhandledPacket)
      }).should.throw(UnhandledPacketError)
    })

  })

})
