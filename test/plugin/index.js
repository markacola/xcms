
import assert from 'assert'
import sinon from 'sinon'
import App, {Plugin, Packet} from '../../src/app'
import {UnhandledPacketError} from '../../src/errors'

describe('Plugin', () => {
  let app, pluginA, pluginB, pluginC, packetA, packetB

  beforeEach(() => {
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
    packetA = new Packet({type: 'test-packet-a'})
    packetB = new Packet({type: 'test-packet-b'})
  })

  describe('onMount', () => {
    it('should register new plugin', function() {
      this.timeout(50)
      let spy = sinon.spy(app, 'handlePacket')

      app.use(pluginA, pluginB, pluginC)
      app.unuse(pluginC)

      setTimeout(() => {
        spy.calledTwice.should.be.true()
        spy.getCall(0).args[0].type.should.be('test-packet-a')
        spy.getCall(1).args[0].type.should.be('test-packet-b')
      }, 30)
    })
  })

})
