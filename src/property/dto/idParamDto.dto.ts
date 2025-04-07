import { IsInt, IsPositive } from "class-validator";

export class IdParamDto {
    @IsInt({ message: 'Id must be an integer' })
    @IsPositive({ message: 'Id must be a positive integer' })
    id: number;
}