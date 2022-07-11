import * as borsh from "@project-serum/borsh";

export const deserializeJokeAccount = (bytes: Buffer): any => {
    // JokeAccount is created using Anchor
    // And anchor accounts add an extra 8 bytes at the beginning, the 'discriminator'
    var data = bytes.slice(8);

    var JOKE_ACCOUNT_SCHEMA = borsh.struct([
      borsh.publicKey("author"),
      borsh.str("content"),
    ]);

    return JOKE_ACCOUNT_SCHEMA.decode(data);
  }