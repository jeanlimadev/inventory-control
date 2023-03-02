export interface ProductProps {
  id: string;
  name: string;
  createdAt: Date;
}

export class ProductModel {
  constructor(private readonly props: ProductProps) {
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
}