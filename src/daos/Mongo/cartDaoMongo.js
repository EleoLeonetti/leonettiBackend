const { cartModel } = require('./models/carts.models.js')

class cartDaoMongo {
    constructor() {
        this.model = cartModel
    }

    get    = async () => this.model.find({})

    getBy   = async filter => this.model.findOne(filter).populate('products.product', 'price')

    create = async newCart => this.model.create(newCart)

    update = async (cid, cartToUpdate) => this.model.findByIdAndUpdate({_id: cid}, cartToUpdate, {new: true})
 
    delete = async (cid) => this.model. findByIdAndDelete({_id: cid}, {new: true})
}

module.exports = cartDaoMongo