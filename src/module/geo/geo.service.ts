import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

import { CreateGeoDto } from './dto/create-geo.dto';
import { UpdateGeoDto } from './dto/update-geo.dto';

@Injectable()
export class GeoService {
  constructor(private readonly httpService: HttpService) {}

  findAll() {
    return `This action returns all geo`;
  }

  async getBound(adcode: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`https://geo.datav.aliyun.com/areas_v3/bound/${adcode}.json`)
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error);
            throw new HttpException(
              error.message,
              error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }),
        ),
    );
    return data;
  }
}
