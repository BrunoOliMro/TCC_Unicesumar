import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UtilsModule } from '../utils/utils.module';
import { KeycloakService } from './keycloak/keycloak.service';

@Module({
  providers: [AuthService, KeycloakService],
  exports: [AuthService, KeycloakService],
  imports: [UtilsModule,
    JwtModule.register({
      publicKey: process.env["JWT_PUBLIC_KEY"].replace(/\\n/g, '\n'),
      verifyOptions: {
        algorithms: ["RS256"]
      },
    }),
  ]
})
export class AuthModule { }
