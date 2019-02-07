// This is just to remove ts complaining about isolated modules
import * as ts from '../App.tsx'

describe('jest tests', () => {
  it('that one is one', () => {
    expect(1).toEqual(1);
  })
})
