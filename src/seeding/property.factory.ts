
import { Property } from "../entities/property.entity";
import { User } from "../entities/user.entity";
import { setSeederFactory } from "typeorm-extension";


export const PropertyFactor = setSeederFactory(Property, (faker) => {
    const property = new Property();
    property.name = faker.location.street();
    property.price = +faker.commerce.price({min: 1000, max: 10000});
    property.location = faker.location.city();
    return property;
});