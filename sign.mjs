import { readFile } from 'fs/promises';
import jwt from 'jsonwebtoken';
import { fetch } from 'undici';
import yargs from 'yargs';
import { audience, issuer, jwkUrl } from './constants.mjs';

const argv = yargs(process.argv.slice(2))
  .option('sub', {
    describe: 'Sub to sign',
    type: 'string',
    demandOption: true,
  })
  .help().argv;

const sub = argv.sub;

// Load private key from PEM file
const privateKey = await readFile('private.pem', 'utf8');
const keyJson = await fetch(jwkUrl).then((res) => res.json());

const keyid = keyJson.keys[0].kid;

// Generate JWT function
function generateJWT(sub) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = issuedAt + 60 * 60 * 1;

  const payload = {
    sub,
    name: sub.slice(0, sub.indexOf('@')).replace('.', ' '),
    email: sub,
    aud: audience,
    iss: issuer,
    iat: issuedAt,
    exp: expiresAt,
  };

  const token = jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    keyid,
  });

  return token;
}

const token = generateJWT(sub);

console.log(token);
