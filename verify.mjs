import { createRemoteJWKSet, jwtVerify } from 'jose';
import yargs from 'yargs';
import { audience, issuer, jwkUrl } from './constants.mjs';

function readJwtFromPipe() {
  return new Promise((resolve, reject) => {
    let jwt = '';

    process.stdin.setEncoding('utf8');

    process.stdin.on('readable', () => {
      const chunk = process.stdin.read();
      if (chunk !== null) {
        jwt += chunk;
      }
    });

    process.stdin.on('end', () => {
      resolve(jwt.trim());
    });

    process.stdin.on('error', (error) => {
      reject(error);
    });
  });
}

const argv = yargs(process.argv.slice(2))
  .option('jwt', {
    describe: 'JWT to verify',
    type: 'string',
  })
  .help().argv;

const jwt = argv.jwt || (await readJwtFromPipe());

const JWKS = createRemoteJWKSet(jwkUrl);

const { payload, protectedHeader } = await jwtVerify(jwt, JWKS, {
  issuer,
  audience,
});

console.log('protectedHeadr', protectedHeader);
console.log('payload', payload);
