import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import * as path from 'path'

export default() : PostgresConnectionOptions => ({
    url: process.env.URL,
    type: 'postgres',
    port : parseInt(process.env.port || '5432'),
    // entities : [Property],
    entities : [path.resolve(__dirname, "..")  + '/**/*.entity{.ts,.js}'],
    synchronize : true, //make this to false in production 
})