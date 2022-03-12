export interface IUsers {
  email: string;
  password: string;
}

export interface FullUsers extends IUsers {
  _id: string;
}
