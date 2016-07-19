
import assert from 'assert'
import sinon from 'sinon'
import App, {Plugin, Packet} from '../../src/app'
import {UnhandledPacketError} from '../../src/errors'

describe('Plugin', () => {
  let app, pluginA, pluginB, pluginC, packetA, packetB

  beforeEach(() => {
    packetA = new Packet({type: 'test-packet-a'})
    packetB = new Packet({type: 'test-packet-b'})
    class PacketProducerPlugin extends Plugin {
      onMount() {
        this.emit(packetA)
      }
      onUnmount() {
        this.emit(packetB)
      }
    }
    app = new App()
    pluginA = new Plugin({name: 'test-a', handles: 'test-packet-a'})
    pluginB = new Plugin({name: 'test-b', handles: 'test-packet-b'})
    pluginC = new PacketProducerPlugin({name: 'test-c'})
  })

  describe('onMount', () => {

    it('should call mount', () => {
      let spy = sinon.spy(pluginA, 'onMount')

      app.use(pluginA)

      spy.calledOnce.should.be.true()
      spy.getCall(0).args[0].should.equal(app)
    })

  })

  describe('onUnmount', () => {

    it('should call unmount', () => {
      let spy = sinon.spy(pluginA, 'onUnmount')

      app.use(pluginA)
      app.unuse(pluginA)

      spy.calledOnce.should.be.true()
      spy.getCall(0).args[0].should.equal(app)
    })

  })

  describe('consumePacket', () => {

    it('should call consumePacket', () => {
      let consumePacket = sinon.spy(pluginA, 'consumePacket')

      app.use(pluginA)

      pluginA.emit(packetA)

      consumePacket.calledOnce.should.be.true()
      consumePacket.getCall(0).args[0].should.equal(packetA)
    })

  })

  describe('canHandlePacket', () => {

    it('should test straight equity', () => {
      let canHandlePacket = sinon.spy(pluginA, 'canHandlePacket')

      app.use(pluginA)

      pluginA.emit(packetA)

      canHandlePacket.calledOnce.should.be.true()
      canHandlePacket.getCall(0).args[0].should.equal(packetA)
      canHandlePacket.returned(true)
    })

    it('should test packet type in set', () => {
      let pluginA = new Plugin({name: 'test-a', handles: new Set(['test-packet-a', 'test-packet-b'])})
      let canHandlePacket = sinon.spy(pluginA, 'canHandlePacket')

      app.use(pluginA)

      pluginA.emit(packetA)
      pluginA.emit(packetB)

      canHandlePacket.calledTwice.should.be.true()
      canHandlePacket.getCall(0).args[0].should.equal(packetA)
      canHandlePacket.getCall(1).args[0].should.equal(packetB)
      canHandlePacket.returned(true)
    })

    it('should test packet type matches regex', () => {
      let pluginA = new Plugin({name: 'test-a', handles: /test-packet-[ab]/})
      let canHandlePacket = sinon.spy(pluginA, 'canHandlePacket')

      app.use(pluginA)

      pluginA.emit(packetA)
      pluginA.emit(packetB)

      canHandlePacket.calledTwice.should.be.true()
      canHandlePacket.getCall(0).args[0].should.equal(packetA)
      canHandlePacket.getCall(1).args[0].should.equal(packetB)
      canHandlePacket.returned(true)
    })

  })

  describe('dynamic packet generation', () => {

    it('should generate sub-packets', (done) => {
      class PacketA extends Packet {
        constructor() {
          super({type: 'packet-a'})
        }
      }
      class PacketB extends Packet {
        constructor() {
          super({type: 'packet-b'})
        }
      }
      class PacketC extends Packet {
        constructor() {
          super({type: 'packet-c'})
        }
      }
      class PluginA extends Plugin {
        constructor() {
          super({name: 'plugin-a', handles: 'packet-a'})
        }
        consumePacket(packet) {
          if (packet.type === 'packet-a') {
            return this.consumePacketA(packet)
          }
        }
        consumePacketA(packetA) {
          this.emit(new PacketB())
          setTimeout(() => {
            this.emit(new PacketC())
          }, 10)
        }
      }
      class PluginB extends Plugin {
        constructor() {
          super({name: 'plugin-b', handles: /packet-[bc]/})
        }
      }

      let pluginA = new PluginA()
      let pluginB = new PluginB()

      let spy = sinon.spy(pluginB, 'consumePacket')

      app.use(pluginA, pluginB)

      let packetA = new PacketA()
      pluginA.emit(packetA)

      setTimeout(() => {
        spy.calledTwice.should.be.true()
        spy.getCall(0).args[0].type.should.equal('packet-b')
        spy.getCall(1).args[0].type.should.equal('packet-c')
        done()
      }, 15)
    })

  })

})
