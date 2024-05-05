import { ObjectId } from "mongodb";

export class Column {
  constructor(public name: string) {}
}

export default class Dashboard {
  constructor(
    public name: string,
    public columns?: Column[],
    public _id?: ObjectId
  ) {}
}
