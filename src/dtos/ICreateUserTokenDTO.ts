interface ICreateUserTokenDTO {
  user_id: string;
  expires_date: Date;
  user_token: string;
}

export { ICreateUserTokenDTO };
