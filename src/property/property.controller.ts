import { Body, Controller, Delete, Get, Headers, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/idParamDto.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { CreatePropertyZodDto, createPropertyZodSchema } from './dto/createPropertyZod.dto';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from './pipes/request-header';
import { PropertyService } from './property.service';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('property')
export class PropertyController {


    constructor(private propertyService : PropertyService){} //dependency injection

    @Get()
    findAll (@Query() paginationDto: PaginationDto){
        return this.propertyService.findAll(paginationDto);  
    }

   
    @Get(':id')
    findOne (@Param('id', ParseIntPipe) id){
        return this.propertyService.findOne(id);
        
    }

    @Post()
    create (@Body() dto : CreatePropertyDto){
        return this.propertyService.create(dto);
    }
 
    @Post('create')
       createWithBody (@Body() body : CreatePropertyDto){
        return this.propertyService.create(body);
    }


    @Patch(':id')
    update (
        @Param('id', ParseIdPipe) id ,
        @Body() body : UpdatePropertyDto,
        header :HeadersDto
    ){
        return this.propertyService.update(id, body);
    }

    @Delete(':id')
    delete (@Param('id', ParseIntPipe) id){
        return this.propertyService.delete(id);
    }

}
