import bs58check from 'bs58check';
import * as bitcoin from 'bitcoinjs-lib';
import { sha256 } from '@noble/hashes/sha256';
import { Network } from 'bitcoinjs-lib';
import * as ecc from '@bitcoinerlab/secp256k1';

bitcoin.initEccLib(ecc);

export enum AddressTypeString {
  p2pkh = 'p2pkh',
  p2tr = 'p2tr',
  p2sh = 'p2sh',
  p2wpkh = 'p2wpkh',
  p2wpkh_testnet = 'p2wpkh_testnet',
  p2tr_testnet = 'p2tr_testnet',
  p2sh_testnet = 'p2sh_testnet',
  p2pkh_testnet = 'p2pkh_testnet',
  unknown = 'unknown',
}

export enum AddressType {
  p2pkh = 'p2pkh',
  p2tr = 'p2tr',
  p2sh = 'p2sh',
  p2wpkh = 'p2wpkh',
}

export function getAddressType(address: string): AddressTypeString {
  if (address.startsWith('bc1q')) {
    return AddressTypeString.p2wpkh;
  } else if (address.startsWith('bc1p')) {
    return AddressTypeString.p2tr;
  } else if (address.startsWith('1')) {
    return AddressTypeString.p2pkh;
  } else if (address.startsWith('3')) {
    return AddressTypeString.p2sh;
  } else if (address.startsWith('tb1q')) {
    return AddressTypeString.p2wpkh_testnet;
  } else if (address.startsWith('m')) {
    return AddressTypeString.p2pkh_testnet;
  } else if (address.startsWith('2')) {
    return AddressTypeString.p2sh_testnet;
  } else if (address.startsWith('tb1p')) {
    return AddressTypeString.p2tr_testnet;
  } else {
    return AddressTypeString.unknown;
  }
}

export function stripAddressPrefix(str: string): string {
  if (str.startsWith('bc1q') || str.startsWith('bc1p') || str.startsWith('tb1q') || str.startsWith('tb1p')) {
    return str.slice(4);
  } else if (str.startsWith('1') || str.startsWith('3') || str.startsWith('m') || str.startsWith('2')) {
    return str.slice(1);
  } else {
    return str;
  }
}

export function addAddressPrefix(addressType: AddressTypeString, address: string): string {
  switch (addressType) {
    case AddressTypeString.p2wpkh:
      return 'bc1q' + address;
    case AddressTypeString.p2tr:
      return 'bc1p' + address;
    case AddressTypeString.p2pkh:
      return '1' + address;
    case AddressTypeString.p2sh:
      return '3' + address;
    case AddressTypeString.p2wpkh_testnet:
      return 'tb1q' + address;
    case AddressTypeString.p2tr_testnet:
      return 'tb1p' + address;
    case AddressTypeString.p2pkh_testnet:
      return 'm' + address;
    case AddressTypeString.p2sh_testnet:
      return '2' + address;
    default:
      return address;
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
  // Detect legacy address
  try {
    bitcoin.address.fromBase58Check(address);
  } catch (err) {
    /* empty */
  }

  switch (addressType) {
    case AddressTypeString.p2pkh: {
      const p2pkh = addressToP2PKH(address);
      const p2pkhBuf = Buffer.from(p2pkh, 'hex');
      return {
        output: Buffer.from(p2pkh, 'hex'),
        scripthash: Buffer.from(sha256.create().update(p2pkhBuf).digest()).reverse().toString('hex'),
        address,
      };
    }
    case AddressTypeString.unknown: {
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
  const address = bitcoin.address.fromOutputScript(Buffer.from(script, 'hex'), getNetwork(network));
  return address;
}

export function addressToScripthash(address: string): string {
  const p2pkh = addressToP2PKH(address);
  const p2pkhBuf = Buffer.from(p2pkh, 'hex');
  return Buffer.from(sha256.create().update(p2pkhBuf).digest()).reverse().toString('hex');
}

export function addressToP2PKH(address: string): string {
  const addressDecoded = bs58check.decode(address);
  const addressDecodedSub = Buffer.from(addressDecoded).toString('hex').substr(2);
  const p2pkh = `76a914${addressDecodedSub}88ac`;
  return p2pkh;
}

export function addressToHash160(address: string): string {
  const addressDecoded = bs58check.decode(address);
  const addressDecodedSub = addressDecoded.toString().substr(2);
  return addressDecodedSub;
}

export function hash160BufToAddress(hash160: Buffer): string {
  const addressEncoded = bs58check.encode(hash160);
  return addressEncoded;
}

export function hash160HexToAddress(hash160: string): string {
  const addressEncoded = bs58check.encode(Buffer.from(hash160, 'hex'));
  return addressEncoded;
}
