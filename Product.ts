import { v4 as uuid } from "uuid";

export default class Product {
  private _id: string;
  private _price: number;

  name: string;
  category: ProductCategories;

  constructor(
    name: string,
    price: number,
    category: ProductCategories = ProductCategories.Other
  ) {
    this._id = uuid();
    this.name = name;
    this._price = price;
    this.category = category;
  }

  get id() {
    return this._id;
  }

  get price() {
    return this._price;
  }

  set price(newPrice: number) {
    if (newPrice < 0) throw Error("");
    this.price = newPrice;
  }

  get formattedPrice() {
    return "R$" + this._price.toFixed(2).replace(".", ",");
  }
}

enum ProductCategories {
  Videogame = "Videogame",
  Smartphone = "Smartphone",
  Furniture = "Móvel",
  Other = "Other",
}
