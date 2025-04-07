import { faker } from "@faker-js/faker";
import { Property } from "../entities/property.entity";
import { PropertyType } from "../entities/property.Type.entity";
import { PropertyFeature } from "../entities/propertyFeature.entity";
import { User } from "../entities/user.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const typeRepo = dataSource.getRepository(PropertyType);
    const propertyRepo = dataSource.getRepository(Property);

    console.log("Seeding property types...");
    const propertyTypes = await typeRepo.save([
      { value: 'Apartment' },
      { value: 'Condo' }
    ]);

    console.log("Seeding users...");
    const userFactory = await factoryManager.get(User);
    const users = await userFactory.saveMany(10);

    const propertyFactory = await factoryManager.get(Property);
    const propertyFeatureFactory = await factoryManager.get(PropertyFeature);

    console.log("Seeding properties...");
    const properties = await Promise.all(
      Array.from({ length: 50 }).map(async () => {
        const propertyFeature = await propertyFeatureFactory.save();

        const property = await propertyFactory.make({
          name: faker.company.name(),
          location: faker.location.city(),
          price: faker.number.int({ min: 50000, max: 500000 }),
          user: faker.helpers.arrayElement(users),
          propertyType: faker.helpers.arrayElement(propertyTypes),
          propertyFeature: propertyFeature,
        });

        return property;
      })
    );

    await propertyRepo.save(properties);
    console.log("Seeding properties done.");
  }
}
