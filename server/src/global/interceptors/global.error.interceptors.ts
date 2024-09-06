import { ArgumentsHost, CallHandler, Catch, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseService } from '../../utils/response/response.service';

const responsesService = new ResponseService();

@Injectable()
export class GlobalErrorInterceptor implements NestInterceptor {

    intercept(
        context: ExecutionContext,
        next: CallHandler<unknown>
    ): Observable<unknown> | Promise<Observable<unknown>> {
        return next.handle()
            .pipe(
                catchError((err) => {
                    console.log(err);
                    return throwError(() => {
                        if (err.response && err.response.isResponse) {
                            throw new HttpException(err.response, err.response.status);
                        } else {
                            return responsesService.selectErrorResponse(err.status);
                        }
                    });
                })
            );
    }

}

@Catch(HttpException)
export class HttpExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const status = exception.getStatus();
        const response = exception.getResponse() as any;
        const res = ctx.getResponse();

        if (response && response.isResponse) {
            res.status(response.status).json(response);
        } else {
            res.status(status).json(responsesService.selectErrorResponseObj(status));
        }
    }

}