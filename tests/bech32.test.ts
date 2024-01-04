import { fromAtom32, toAtom32 } from '../src';

describe('bech32', () => {
  it('test', () => {
    const origin = 'bc1p46jlcxndzgg66k6yv0gffdafaujqpmpx4e6pzvkrh2dmxf9v542s8rmml7';
    const atom32 = toAtom32(origin);
    expect(atom32).toBe('atom12ys2af0urfk3yyddtdzx85y5k7577fqqasn2uaq3xtpm4xanyjk224gdz5f2p');
    const res = fromAtom32(atom32);
    expect(res).toBe(origin);

    console.log({
      atom32,
      origin,
    });
  });
});
