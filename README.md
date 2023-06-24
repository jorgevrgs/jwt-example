# JWT Examples

## Generate

Generate files:

- private.pem
- public.pem
- key.json

```sh
node generate.mjs
```

## Server

Start the server for `http://localhost:3000/key.json`

```sh
node server.cjs
```

## Sign

Sign a sub to generate a JWT:

```sh
node sign.mjs --sub user@example.com
```

## Verify

Verify the generated token using the server key.json:

```sh
node verify.mjs --jwt XXX
```

## All-in-one

Run the sign-verify steps:

```sh
node sign.mjs --sub user@example.com | node verify.mjs --jwt "$(</dev/stdin)"
```

