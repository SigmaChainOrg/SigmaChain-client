export enum IdType {
  ID_CARD = "id_card",
  PASSPORT = "passport",
}

export interface UserInfoRead {
  firstName: string;
  lastName: string;
  idType: IdType;
  idNumber: string;
  birthDate: Date;
}

export interface UserInfoUpdate {
  firstName?: string;
  lastName?: string;
  idType?: IdType;
  idNumber?: string;
  birthDate?: string;
}

export interface UserRead {
  userId: string;
  email: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  userInfo?: UserInfoRead;
  groups?: string[];
  roles?: string[];
}

export interface UserQuery {
  includeUserInfo?: boolean;
  includeGroups?: boolean;
  includeRoles?: boolean;
}
