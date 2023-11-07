import keyGeneration from "./keyGeneration.js";
import deriveKey from "./deriveKey.js";

const { publicKeyJwk, privateKeyJwk } = await keyGeneration();
const derivedKey = await deriveKey(publicKeyJwk, privateKeyJwk);
const iv = new TextEncoder().encode("Initialization Vector");

document.getElementById("form").addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const text = event.target.firstElementChild.value;
  const encodedText = new TextEncoder().encode(text);
  document.getElementById("encoded-text").innerText = encodedText;

  encrypt(encodedText);
}

async function encrypt(encodedText) {
  const encryptData = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    derivedKey,
    encodedText
  );
  var string = new TextDecoder().decode(encryptData);
  document.getElementById("encrypted-text").innerText = string;
  console.log("encryptData--->", encryptData);
  decrypt(encryptData);
}

async function decrypt(encryptData) {
  const decryptedData = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    derivedKey,
    encryptData
  );

  const decodedText = new TextDecoder().decode(decryptedData);
  document.getElementById("decrypted-text").innerText = decodedText;
}
