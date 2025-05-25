export interface UserInfoRead {}

export interface UserInfoUpdate {
  firstName: string;
  lastName: string;
  idType: string;
  idNumber: string;
  birthDate: string | null;
}

export interface UserRead {
  userId: string;
  email: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  userInfo: UserInfoRead | null;
  groups: string[] | null;
  roles: string[] | null;
}
