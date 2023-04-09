const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    // const c = new Campground({ title: 'purple field' });
    // await c.save();
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '642ec329db172593ac565ac0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nobis incidunt fugiat asperiores, odio doloremque. Dicta laboriosam aspernatur dolorum qui vitae, doloribus suscipit iste ipsum placeat quos consequuntur cum inventore!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dmhrfbfol/image/upload/v1681043908/YelpCamp/kevin-ianeselli-ebnlHkqfUHY-unsplash_mrgcdj.jpg',
                    filename: 'YelpCamp/kevin-ianeselli-ebnlHkqfUHY-unsplash_mrgcdj',
                },
                {
                    url: 'https://res.cloudinary.com/dmhrfbfol/image/upload/v1681043908/YelpCamp/tegan-mierle-fDostElVhN8-unsplash_p2fwdu.jpg',
                    filename: 'YelpCamp/tegan-mierle-fDostElVhN8-unsplash_p2fwdu',
                },
              ],
        })
        await camp.save();
    }
    console.log("seedDB() was completed.");
}

seedDB().then(() => mongoose.connection.close());