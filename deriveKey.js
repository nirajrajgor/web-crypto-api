export default async (publicKeyJwk, privateKeyJwk) => {
  const publicKey = await window.crypto.subtle.importKey(
    "jwk",
    publicKeyJwk,
    {
      name: "ECDH",
      namedCurve: "P-256", //can be "P-256", "P-384", or "P-521"
    },
    true,
    [] //"deriveKey" and/or "deriveBits" for private keys only (just put an empty list if importing a public key)
  );

  const privateKey = await window.crypto.subtle.importKey(
    "jwk",
    privateKeyJwk,
    {
      name: "ECDH",
      namedCurve: "P-256", //can be "P-256", "P-384", or "P-521"
    },
    true,
    ["deriveKey", "deriveBits"] //"deriveKey" and/or "deriveBits" for private keys only (just put an empty list if importing a public key)
  );

  return await window.crypto.subtle.deriveKey(
    {
      name: "ECDH",
      namedCurve: "P-256",
      public: publicKey, //an ECDH public key from generateKey or importKey
    },
    privateKey, //your ECDH private key from generateKey or importKey
    {
      //the key type you want to create based on the derived bits
      name: "AES-GCM", //can be any AES algorithm ("AES-CTR", "AES-CBC", "AES-CMAC", "AES-GCM", "AES-CFB", "AES-KW", "ECDH", "DH", or "HMAC")
      //the generateKey parameters for that type of algorithm
      length: 256, //can be  128, 192, or 256
    },
    true, //whether the derived key is extractable (i.e. can be used in exportKey)
    ["encrypt", "decrypt"] //limited to the options in that algorithm's importKey
  );
};
