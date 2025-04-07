import { Property } from "src/entities/property.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const pgConfig: PostgresConnectionOptions ={
    url: 'postgresql://neondb_owner:npg_3iZnyOB2pxGR@ep-calm-haze-a1emhyd2-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
    type: 'postgres',
    port : 3306,
    // entities : [Property],
    entities : [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize : true, //make this to false in production 
}