export interface UserAttributes {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
  avatar?: string;
}

export interface UserCreationAttributes extends Omit<UserAttributes, "id"> {}
