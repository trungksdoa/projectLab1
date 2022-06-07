export class Users {
  public id: number
  public name: String
  public password: String
  public address: String
  public phone: String
  public isAdmin:boolean
  constructor (
    id: number,
    name: String,
    password: String,
    address: String,
    phone: String
  ) {
    this.id = id
    this.name = name
    this.password = password
    this.address = address
    this.phone = phone
  }
}
