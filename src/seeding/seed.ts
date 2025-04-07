import  dbConfig  from "../config/db.config";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { PropertyFactor } from "./property.factory";
import { UserFactory } from "./user.factory";
import { PropertyFeatureFactory } from "./propertyFeature.factory";
import { MainSeeder } from "./main.seeder";


const options : DataSourceOptions & SeederOptions = {
    ...dbConfig(),
    factories : [PropertyFactor, UserFactory, PropertyFeatureFactory],
    seeds : [MainSeeder]

}

const dataSource = new DataSource(options);
dataSource.initialize().then(async () => {
    await dataSource.synchronize(true);
    await runSeeders(dataSource);
    process.exit();
})