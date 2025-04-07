
import { PropertyFeature } from "../entities/propertyFeature.entity";
import { User } from "../entities/user.entity";
import { setSeederFactory } from "typeorm-extension";


export const PropertyFeatureFactory = setSeederFactory(PropertyFeature, (faker) => {
   
    const feature = new PropertyFeature();
    feature.area = faker.number.int({min: 50, max: 500});
    feature.bedrooms = faker.number.int({min: 1, max: 5});
    feature.bathrooms = faker.number.int({min: 1, max: 5});
    feature.parkingSpots = faker.number.int({min: 0, max: 3});
    feature.hasBalcony = faker.datatype.boolean();
    feature.hasGardernYard = faker.datatype.boolean();
    feature.hasSwimmingPool = faker.datatype.boolean();

    return feature;
});