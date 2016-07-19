
import {UnhandledPacketError} from '../../src/errors'

describe('errors', () => {

  describe('UnhandledPacketError', () => {

    describe('constructor', () => {

      it('should throw with default message', () => {

        (() => {
          throw new UnhandledPacketError()
        }).should.throw(UnhandledPacketError, {message: 'unhandled packet'})

      })

      it('should throw with custom message', () => {

        (() => {
          throw new UnhandledPacketError('my custom packet was not handled')
        }).should.throw(UnhandledPacketError, {message: 'my custom packet was not handled'})

      })

    })

  })

})
