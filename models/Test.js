const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const{Item} = require('./Item')


async function main(){
    await Restaurant.sync({force:true})
    await Menu.sync({force:true})

    let newRestaurant =  await Restaurant.create({
        name:'Wagamamas',
        location: 'Birmingham',
        cuisine: 'Japanese'
    })

    let newMenu = await Menu.create({
        title: 'Gyoza'
    })

    await newRestaurant.addMenu(newMenu);

    
}

main()