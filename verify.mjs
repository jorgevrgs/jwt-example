import { createRemoteJWKSet, jwtVerify } from 'jose';

// Get the JWT from the command line argument
const args = process.argv.slice(2);
const jwt = args[0];

const JWKS = createRemoteJWKSet(new URL('http://localhost:3000/key.json'));

const { payload, protectedHeader } = await jwtVerify(jwt, JWKS, {
  issuer: 'urn:example:issuer',
  audience: 'urn:example:audience',
});

console.log(protectedHeader);
console.log(payload) ;
