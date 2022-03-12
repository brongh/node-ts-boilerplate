export interface IUsers {
  email: string;
  password: string;
  token?: string;
}

export interface FullUsers extends IUsers {
  _id: string;
}
