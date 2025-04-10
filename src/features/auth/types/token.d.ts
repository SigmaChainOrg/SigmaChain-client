export interface TokenRead {
  accessToken: string;
  tokenType: string;
}

export interface TokenPayload {
  sub: string;
  roles: string[];
  exp: number;
}
