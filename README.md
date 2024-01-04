# atom32

## Quick Start

```bash
pnpm install && pnpm run test
```


- [atom32](#atom32)
  - [Quick Start](#quick-start)
  - [Proposal Draft](#proposal-draft)
    - [Abstract](#abstract)
    - [Motivation](#motivation)
    - [Specification](#specification)
      - [Problem Statement](#problem-statement)
      - [Proposed Solution](#proposed-solution)
      - [Benefits](#benefits)
    - [Implementation](#implementation)
      - [Address Format](#address-format)
      - [Integration and Adoption](#integration-and-adoption)
    - [Future Work](#future-work)
    - [Conclusion](#conclusion)



## Proposal Draft
---
Title: Address Standardization Proposal for Asset Identification in the Atomicals Protocol

Author: [Your Name]

Type: Standards Track

Status: Draft

Created: [Date]

---



### Abstract
This proposal introduces a standardized address format based on bech32 encoding to resolve asset identification challenges within the Bitcoin system, particularly concerning the Atomicals Protocol. The new address format aims to differentiate Atomicals Protocol assets from Bitcoin assets, enabling node services to accurately identify and handle distinct asset types, thus preventing unintended asset burning during transactions.

### Motivation
In the Bitcoin ecosystem, the Atomicals Protocol operates based on colored coin theory, sharing Bitcoin addresses and UTXOs. This overlap leads to a critical issue: traditional node services cannot distinguish between assets from different protocols. Consequently, during user transactions, assets might inadvertently be merged or burned due to insufficient UTXO differentiation. This poses a significant risk to asset security and user confidence.

### Specification
#### Problem Statement
- **Shared Address and UTXO**: Atomicals Protocol assets share addresses and UTXOs with Bitcoin, causing confusion and potential loss.
- **Lack of Asset Differentiation**: Traditional node services fail to differentiate between Bitcoin and Atomicals Protocol assets, leading to accidental asset burning.

#### Proposed Solution
**bech32 Address Format**: Implement a bech32-based address format specifically for Atomicals Protocol assets. This format will be distinct yet compatible with existing Bitcoin addresses.
**Asset Differentiation**: Indexing nodes will recognize and differentiate assets based on the new address format. This recognition extends to wallets, block explorers, and trading platforms, ensuring end-to-end asset distinction.

#### Benefits
- **Enhanced Security**: Prevents accidental merging and burning of Atomicals Protocol assets.
- **Clear Asset Identification**: Enables node services, wallets, and other platforms to accurately identify and handle distinct asset types.
- **Ecosystem Support**: Encourages widespread adoption and support across wallets, block explorers, and trading platforms.

### Implementation
#### Address Format
The proposed address format will utilize bech32 encoding, offering a more user-friendly and error-resistant structure. It will be distinctively marked to indicate Atomicals Protocol assets.

#### Integration and Adoption
- **Node Services**: Update to recognize and process the new address format.
- **Wallets and Block Explorers**: Adapt to support and display the new format.
- **Trading Platforms**: Ensure compatibility and proper handling of the new format for seamless trading.


### Future Work

- **Testing and Feedback**: Solicit community feedback and conduct thorough testing to ensure robustness and reliability.
- **Education and Outreach**: Educate users and service providers about the new format and its importance.

### Conclusion
Introducing a bech32-based address format for the Atomicals Protocol is a critical step towards resolving asset identification issues within the Bitcoin ecosystem. By clearly differentiating between Bitcoin and Atomicals Protocol assets, we can enhance security, foster ecosystem support, and ensure a more reliable and user-friendly experience for all stakeholders.

This proposal is a starting point for discussion and further development. Feedback and contributions from the community are crucial for refining and implementing this standard.