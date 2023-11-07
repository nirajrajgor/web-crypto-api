import keyGeneration from "./keyGeneration.js";
import deriveKey from "./deriveKey.js";

const { publicKeyJwk, privateKeyJwk } = await keyGeneration();

const derivedKey = await deriveKey(publicKeyJwk, privateKeyJwk);
console.log("derivedKey--->", derivedKey);

const iv = new TextEncoder().encode("Initialization Vector");

console.log("Text-->", "Hello World");

const encodedText = new TextEncoder().encode("Hello World");
console.log("encodedText--->", encodedText);

const encryptData = await window.crypto.subtle.encrypt(
  { name: "AES-GCM", iv },
  derivedKey,
  encodedText
);
console.log("encryptData--->", encryptData);

const decryptedData = await window.crypto.subtle.decrypt(
  { name: "AES-GCM", iv },
  derivedKey,
  encryptData
);
console.log("decryptedData--->", decryptedData);

const decodedText = new TextDecoder().decode(decryptedData);
console.log("decryptedData--->", decodedText);
