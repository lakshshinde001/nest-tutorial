import { isInt, IsInt, IsPositive, IsString, Length } from "class-validator";

export class CreatePropertyDto{
    @IsString()
    @Length(5, 20)
    name : string;

    @IsString()
    @Length(2, 50, {groups:['create']})
    @Length(1,50, {groups:['update']})
    description : string;

    @IsInt()
    @IsPositive()
    price : number;

    @IsString()
    location : string;

}