export interface ICommerce {
  username: string;
  password: string;
  commerce_name: string;
  isActive: boolean;
  pk: string;
}

export type ILoginRequest = Pick<ICommerce, "username" | "password">;
