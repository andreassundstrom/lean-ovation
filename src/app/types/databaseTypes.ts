import { ObjectId } from "mongodb";

export class Note {
  constructor(
    public description: string,
    public name: string,
    public _id?: ObjectId
  ) {}
}

export class Column {
  constructor(
    public name: string,
    public _id?: ObjectId,
    public notes?: Note[]
  ) {}
}

export default class Dashboard {
  constructor(
    public name: string,
    public columns?: Column[],
    public _id?: ObjectId
  ) {}
}
