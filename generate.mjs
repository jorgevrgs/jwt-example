import { writeFile } from 'fs/promises';
import { exportJWK, generateKeyPair, exportPKCS8, exportSPKI } from 'jose';
import { v4 as uuidv4 } from 'uuid';

// Generate a new key pair
const { privateKey, publicKey } = await generateKeyPair('RS256', {
  modulusLength: 2048,
  publicKeyUse: 'sig'
});

// Convert keys to PEM format
const privateKeyPEM = await exportPKCS8(privateKey);
const publicKeyPEM = await exportSPKI(publicKey);

// Save keys to PEM files
await writeFile('private.pem', privateKeyPEM);
await writeFile('public.pem', publicKeyPEM);

// Create key object for key.json
const keyObject = await exportJWK(publicKey, { alg: 'RS256', use: 'sig' });

// Generate a random Key ID (kid)
const kid = uuidv4();

// Set the kid in the key object
keyObject.kid = kid;
keyObject.alg = 'RS256';
keyObject.use = 'sig';

console.log('private.pem', privateKeyPEM);
console.log('public.pem', publicKeyPEM);
console.log('kid', keyObject.kid);

// Create key JSON object
const keyJSON = { keys: [ keyObject ] };

// Save key JSON to key.json file
await writeFile('key.json', JSON.stringify(keyJSON, null, 2));

console.log('Key pair generated and saved successfully.');

