export interface Banner {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  buttonText: string;
  desc: string;
  discount: string;
  image: object;
  largeText1: string;
  largeText2: string;
  midText: string;
  product: string;
  saleTime: string;
  smallText: string;
}

interface Image {
  asset: { _ref: string };
  _key: string;
  _type: string;
}

export interface Product {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  details: string;
  image: Image[];
  name: string;
  price: number;
  slug: { current: string };
}

export interface CartItem extends Product {
  quantity: number;
}
