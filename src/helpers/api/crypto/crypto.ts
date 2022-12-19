import { browserCrypto } from './browser-crypto';
import { nodeCrypto } from './node-crypto';

export const crypto = import.meta.env.TEST ? nodeCrypto() : browserCrypto();
