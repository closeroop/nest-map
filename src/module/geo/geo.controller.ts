import { Controller, Get, Param } from '@nestjs/common';
import { GeoService } from './geo.service';
import { CreateGeoDto } from './dto/create-geo.dto';
import { UpdateGeoDto } from './dto/update-geo.dto';

@Controller('geo')
export class GeoController {
  constructor(private readonly geoService: GeoService) {}

  @Get()
  findAll() {
    return this.geoService.findAll();
  }

  @Get('bound/:adcode')
  findOne(@Param('adcode') adcode: string) {
    return this.geoService.getBound(adcode);
  }
}
