import { ObjectId } from "mongodb";

export class Note {
  constructor(
    public description: string,
    public name: string,
    public _id?: ObjectId,
    public _columnId?: ObjectId
  ) {}
}

export class Column {
  constructor(
    public name: string,
    public _id?: ObjectId,
    public sortOrder?: number
  ) {}
}

export default class Dashboard {
  constructor(
    public name: string,
    public columns?: Column[],
    public _id?: ObjectId
  ) {}
}
