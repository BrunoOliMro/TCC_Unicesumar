import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ResponseService } from '../response/response.service';
import { NextResponse } from '../response/types/response.types';
import { AxiosError } from 'axios';

@Injectable()
export class AxiosService {

    constructor(
        @Inject(ResponseService) private responsesService: ResponseService
    ) { }

    handleError(err: AxiosError, status: number, message: NextResponse<undefined>) {
        if (err.response && err.response.status !== 500) {
            throw new HttpException(message, status);
        } else {
            this.responsesService.selectErrorResponse(500);
        }
    }

}
