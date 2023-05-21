export interface IUser {
  id: number;
  email: string;
  name: string;
  token: string;
}

export type AuthProps = {
  email: string;
  password: string;
};

export type RegisterProps = {
  email: string;
  name: string;
  password: string;
};

export interface IEntry {
  id: number;
  createdAt: string;
  text: string;
  img: string;
  userId: number;
  user: {
    name: string;
  };
}
