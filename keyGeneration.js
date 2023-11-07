export default async () => {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "ECDH",
      namedCurve: "P-256", //can be "P-256", "P-384", or "P-521"
    },
    true, //whether the key is extractable (i.e. can be used in exportKey)
    ["deriveKey", "deriveBits"] //can be any combination of "deriveKey" and "deriveBits"
  );

  const publicKeyJwk = await window.crypto.subtle.exportKey(
    "jwk", //can be "jwk" (public or private), "raw" (public only), "spki" (public only), or "pkcs8" (private only)
    keyPair.publicKey //can be a publicKey or privateKey, as long as extractable was true
  );

  const privateKeyJwk = await window.crypto.subtle.exportKey(
    "jwk", //can be "jwk" (public or private), "raw" (public only), "spki" (public only), or "pkcs8" (private only)
    keyPair.privateKey //can be a publicKey or privateKey, as long as extractable was true
  );

  return { publicKeyJwk, privateKeyJwk };
};
