import { Users } from '../../model/user'
import { Product } from 'src/app/api/product/product'
export interface Cart {
  id: number
  lastUpdated: String
  createAt: String
  cartItem: Array<cartItemsWithSelect>
  userId: Users
  TotalPrice:number
}
export interface cartItem {
  id: number
  productItem: Product
  quantity: any
  productPrice: any
  active: boolean
}


export interface cartItemsWithSelect  extends cartItem{
  selected: boolean
}
