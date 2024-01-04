import bs58check from 'bs58check';
import * as bitcoin from 'bitcoinjs-lib';
import { Network } from 'bitcoinjs-lib';
import { sha256 } from '@noble/hashes/sha256';
import * as ecc from '@bitcoinerlab/secp256k1';

bitcoin.initEccLib(ecc);

export enum AddressType {
  p2tr = 'p2tr',
  p2pkh = 'p2pkh',
  p2sh_p2wpkh = 'p2sh_p2wpkh',
  p2wpkh = 'p2wpkh',
  unknown = 'unknown',
}

export function getAddressType(address: string): AddressType {
  if (address.startsWith('bc1q')) {
    return AddressType.p2wpkh;
  } else if (address.startsWith('bc1p')) {
    return AddressType.p2tr;
  } else if (address.startsWith('1')) {
    return AddressType.p2pkh;
  } else if (address.startsWith('3')) {
    return AddressType.p2sh_p2wpkh;
  }
  // testnet
  else if (address.startsWith('tb1q')) {
    return AddressType.p2wpkh;
  } else if (address.startsWith('m') || address.startsWith('n')) {
    return AddressType.p2pkh;
  } else if (address.startsWith('2')) {
    return AddressType.p2sh_p2wpkh;
  } else if (address.startsWith('tb1p')) {
    return AddressType.p2tr;
  }

  return AddressType.unknown;
}

export function stripAddressPrefix(str: string): string {
  if (str.startsWith('bc1q') || str.startsWith('bc1p') || str.startsWith('tb1q') || str.startsWith('tb1p')) {
    return str.slice(4);
  } else if (str.startsWith('1') || str.startsWith('3') || str.startsWith('m') || str.startsWith('n') || str.startsWith('2')) {
    return str.slice(1);
  } else {
    return str;
  }
}

export function addPrefixByAddressTypeFromScriptHash(scriptHash: string, network: Network): string {
  return bitcoin.address.fromOutputScript(Buffer.from(scriptHash, 'hex'), network);
}

export function detectAddressTypeToScripthash(
  address: string,
  network?: Network | string,
): {
  output: Buffer;
  scripthash: string;
  address: string;
} {
  const addressType = getAddressType(address);
  const __network = addressType.endsWith('testnet') ? 'testnet' : 'bitcoin';

  const _network = getNetwork(network ?? __network);

  switch (addressType) {
    case AddressType.p2pkh: {
      const p2pkh = addressToP2PKH(address);
      const p2pkhBuf = Buffer.from(p2pkh, 'hex');
      return {
        output: Buffer.from(p2pkh, 'hex'),
        scripthash: Buffer.from(sha256.create().update(p2pkhBuf).digest()).reverse().toString('hex'),
        address,
      };
    }
    case AddressType.unknown: {
      throw 'unrecognized address';
    }
    default: {
      const output = bitcoin.address.toOutputScript(address, _network);
      return {
        output,
        scripthash: Buffer.from(sha256.create().update(output).digest()).reverse().toString('hex'),
        address,
      };
    }
  }
}

export function getNetwork(network?: Network | string) {
  if (typeof network === 'string') {
    if (network === 'testnet') {
      return bitcoin.networks.testnet;
    } else {
      return bitcoin.networks.bitcoin;
    }
  } else {
    return network;
  }
}

export function detectScriptToAddressType(script: string, network?: Network | string): string {
  return bitcoin.address.fromOutputScript(Buffer.from(script, 'hex'), getNetwork(network));
}

export function addressToScripthash(address: string): string {
  const p2pkh = addressToP2PKH(address);
  const p2pkhBuf = Buffer.from(p2pkh, 'hex');
  return Buffer.from(sha256.create().update(p2pkhBuf).digest()).reverse().toString('hex');
}

export function addressToP2PKH(address: string): string {
  const addressDecoded = bs58check.decode(address);
  const addressDecodedSub = Buffer.from(addressDecoded).toString('hex').substr(2);
  return `76a914${addressDecodedSub}88ac`;
}

export function addressToHash160(address: string): string {
  const addressDecoded = bs58check.decode(address);
  return addressDecoded.toString().substring(2);
}

export function hash160BufToAddress(hash160: Buffer): string {
  return bs58check.encode(hash160);
}

export function hash160HexToAddress(hash160: string): string {
  return bs58check.encode(Buffer.from(hash160, 'hex'));
}
