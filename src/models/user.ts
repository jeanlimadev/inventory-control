export interface UserProps {
  id: string;
  name: string;
  email: string
  password: string;
  createdAt: Date;
}

export class UserModel {
  constructor(private readonly props: UserProps) {
    this.props = props;
  }

  public set id(id: string) {
    this.props.id = id;
  }

  public get id(): string {
    return this.props.id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }
  
  public set password(password: string) {
    this.props.password = password;
  }

  public get password(): string {
    return this.props.password;
  }
}