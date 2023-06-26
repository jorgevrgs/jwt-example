export const port = process.env.PORT ? Number(process.env.PORT) : 1337;

export const jwkPathname = process.env.JWK_PATHNAME ?? '/api/auth/jwk';

export const baseUrl = process.env.BASE_URL ?? `http://localhost:${port}`;

export const jwkUrl = new URL(jwkPathname, baseUrl);

export const issuer = process.env.JWT_ISSUER ?? 'urn:example:issuer';

export const audience = process.env.JWT_AUDIENCE ?? 'urn:example:audience';
