import { ObjectId } from "mongodb";
export default class Dashboard {
  constructor(public name: string, public id?: ObjectId) {}
}
