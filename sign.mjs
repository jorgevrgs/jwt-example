
import { readFile } from 'fs/promises';
import jwt from 'jsonwebtoken';
import yargs from 'yargs';

const argv = yargs(process.argv.slice(2))
  .option('sub', {
    describe: 'Sub to sign',
    type: 'string',
    demandOption: true,
  })
  .help()
  .argv;

const sub = argv.sub;


// Load private key from PEM file
const privateKey = await readFile('private.pem', 'utf8');
const keyText = await readFile('key.json', 'utf8');
const keyJson = JSON.parse(keyText);

const keyid = keyJson.keys[0].kid;

// Generate JWT function
function generateJWT(sub) {
  const payload = {
    sub,
    aud: 'urn:example:audience',
    iss: 'urn:example:issuer'
  };

  const token = jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '1h',
    keyid
  });

  return token;
}

const token = generateJWT(sub);

console.log(token);
