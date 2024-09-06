import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ResponseService } from '../utils/response/response.service';
import { TokenPayload } from './types/auth.types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(JwtService) private jwtService: JwtService
    ) { }

    verifyToken(token: string): TokenPayload {
        return {
            company: "1",
            preferred_username: "usuario"
        }
    }

    findUserByToken(token: string): string {
        return this.verifyToken(token.replace("Bearer", "")).preferred_username;
    }

}
