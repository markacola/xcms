
import ExtendableError from 'es6-error'

export class UnhandledPacketError extends ExtendableError {
  constructor(msg = 'unhandled packet') {
    super(msg)
  }
}
