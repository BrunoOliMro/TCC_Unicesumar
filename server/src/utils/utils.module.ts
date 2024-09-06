import { Module } from '@nestjs/common';
import { ResponseService } from './response/response.service';
import { StringCheckerService } from './string-checker/string-checker.service';
import { FilesService } from './files/files.service';
import { AxiosService } from './axios/axios.service';
import { RandomizerService } from './randomizer/randomizer.service';

@Module({
  providers: [ResponseService, StringCheckerService, FilesService, AxiosService, RandomizerService],
  exports: [ResponseService, StringCheckerService, FilesService, AxiosService, RandomizerService],
})
export class UtilsModule { }
