const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const{Item} = require('./Item')


Menu.belongsTo(Restaurant)
Restaurant.hasMany(Menu)

Item.belongsToMany(Menu, {through: 'menu_item'})
Menu.belongsToMany(Item, {through: 'menu_item'})

module.exports = { Restaurant, Menu, Item }
