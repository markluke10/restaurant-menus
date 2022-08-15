const {db} = require('./db')
const {Restaurant, Menu, Item} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
    seedItem,
  } = require('./seedData');

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await db.sync({ force: true });
    });

    test('can create a Restaurant', async () => {
        const TestRestaurant = await Restaurant.create(seedRestaurant[0])
        expect(TestRestaurant.name).toEqual(seedRestaurant[0].name)
    });

    test('can create a Menu', async () => {
        const TestMenu = await Menu.create(seedMenu[0])
        expect(TestMenu.title).toEqual(seedMenu[0].title)
    });

    test('can find Restaurants', async () => {
        const findRestaurant = await Restaurant.findAll()
        expect(findRestaurant.length).toEqual(1)
        expect(findRestaurant[0].name).toEqual(seedRestaurant[0].name)
    });

    test('can find Menus', async () => {
        const findMenu = await Menu.findAll()
        expect(findMenu[0].title).toEqual(seedMenu[0].title)
    });

    test('can delete Restaurants', async () => {

        const findRestaurant2 = await Restaurant.findAll()
        const deletedRestaurant = await findRestaurant2[0].destroy()
        expect(deletedRestaurant.name).toEqual(findRestaurant2[0].name)
    });

    test('Restaurant can have many Menus', async ()=> {
        // await db.snyc({force:true})

        let newRestaurant =  await Restaurant.create({
            name:'Wagamamas',
            location: 'Birmingham',
            cuisine: 'Japanese'
        })
    
        let newMenu = await Menu.create({
            title: 'Gyoza'
        })
        let oldMenu = await Menu.create({
            title: 'Noodles'
        })
    
        await newRestaurant.addMenu(newMenu);
        await newRestaurant.addMenu(oldMenu);

        const menus = await newRestaurant.getMenus()
        
        expect(menus[0] instanceof Menu).toBe(true)
        // expect(menus[0] instanceof Menu).toBeTruthy
        // expect(menus[0].title).toEqual(newMenu.title)
        // expect(menus.length).toBe(1)

    })

    test('Menu can have many items, Item can have many menus', async()=>{
        // Make a Menu
        // Make an item
        // add item to Menu
        // check if item is attached to a Menu

        let breakfast = await Menu.create(seedMenu[0])
        let lunch = await Menu.create(seedMenu[1])

        let hamburger = await Item.create(seedItem[2])
        let masala = await Item.create(seedItem[0])

        await breakfast.addItem(masala)
        await lunch.addItem(hamburger)

        const items = await breakfast.getItems()

        expect(items[0] instanceof Item ).toBe(true)
        // expect(items[0] instanceof Item ).toBe(seedItem[0])
    })  

})