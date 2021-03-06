import * as CryptoJS from 'crypto-js';
const SHA256 = CryptoJS.SHA256;

function startsWithNCharacters(hash: string, n: number, hexChar: string) {
  const nChars = Array(n + 1).join(hexChar);
  return hash.substring(0, n) === nChars;
}


// -- define our block
class Block {
  private nonce: number = 0;
  public index: number = 0;
  public timestamp: number;
  public previousHash: string;
  public hash: string;

  constructor(public data: any) {
    this.timestamp = Date.now();
    this.previousHash = null;
    this.hash = this.calculateHash();
  }

  public calculateHash(): string {
    return SHA256(
      this.index +
      this.timestamp +
      JSON.stringify(this.data) +
      this.previousHash +
      this.nonce
    ).toString();
  }

  // -- mines the block with given difficulty, checking if the hash starts
  // -- with N amount of '0' characters, you can use any hex char
  public mine(difficulty: number): string {
    while(!startsWithNCharacters(this.hash, difficulty, '0')) {
      this.nonce++;
      this.hash = this.calculateHash();
      console.log(this.hash);
    }
    return this.hash;
  }
}

export default Block;