enum Status {
    Purchased, ToBuy
}
class CartItem {
    public constructor(
        public id: number,
        public name: string,
        public quantity: number,
        public measureUnit: string,
        public price: number,
        public date: Date,
        public status: Status,
        public createdAt: Date,) { }
}
interface IShoppingCart {
    get(date?: Date, status?: Status): Promise<Array<CartItem>>
    getById(id: number): Promise<CartItem | undefined>
    add(item: CartItem | Array<CartItem>): Promise<CartItem | Array<CartItem>>
    markAsPurchased(itemId: number): Promise<CartItem>
    remove(itemId: number): Promise<CartItem>
}

export { IShoppingCart as IShoppingService, CartItem, Status }