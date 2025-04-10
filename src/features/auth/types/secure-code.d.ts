export interface SecureCodeRead {
  secureCodeId: string;
  expiresAt: Date;
}

export interface SecureCodeValidate {
  secureCodeId: string;
  code: string;
}
