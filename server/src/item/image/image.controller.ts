import { Body, Controller, Get, Headers, HttpStatus, Inject, ParseFilePipeBuilder, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { CompaniesService } from '../../companies/companies.service';
import { NextResponse } from '../../utils/response/types/response.types';
import { ResponseService } from '../../utils/response/response.service';
import { HeaderDTO } from '../../global/DTO/global.dto';
import { AddItemImgDTO, AddToolImgDTO, FindItemImgDTO, FindToolImgDTO } from './DTO/image.dto';
import { Roles } from 'nest-keycloak-connect';
import { storage } from '../../global/multer/multer.storage';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('item/image')
export class ImageController {

    constructor(
        @Inject(ImageService) private service: ImageService,
        @Inject(CompaniesService) private companiesService: CompaniesService,
        @Inject(ResponseService) private responsesService: ResponseService
    ) { }

    @Roles({ roles: ["Next_admin"] })
    @Get("image")
    async findItemImg(
        @Headers() headers: HeaderDTO,
        @Query() itemInfo: FindItemImgDTO
    ): Promise<NextResponse<string>> {
        return this.responsesService.dataFetched(await this.service.findItemImgById(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            itemInfo.item_id
        ));
    }

    @Roles({ roles: ["Next_user"] })
    @Get("tec-draw")
    async findItemTecDraw(
        @Headers() headers: HeaderDTO,
        @Query() itemInfo: FindItemImgDTO
    ): Promise<NextResponse<string>> {
        return this.responsesService.dataFetched(await this.service.findItemTecDrawById(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            itemInfo.item_id
        ));
    }

    @Roles({ roles: ["Next_user"] })
    @Get("tool")
    async findToolImg(
        @Headers() headers: HeaderDTO,
        @Query() itemInfo: FindToolImgDTO,
    ): Promise<NextResponse<string>> {
        return this.responsesService.dataFetched(await this.service.findToolImgById(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            itemInfo.tool_id
        ));
    }

    @Roles({ roles: ["Next_admin"] })
    @UseInterceptors(FileInterceptor('file', { storage: storage(process.env["ITEMS_IMG_PATH"]) }))
    @Post()
    async addItemImg(
        @Headers() headers: HeaderDTO,
        @Body() itemImgInfo: AddItemImgDTO,
        @UploadedFile() itemImg: Express.Multer.File
    ): Promise<NextResponse<undefined>> {

        await this.service.addItemImg(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            itemImgInfo.item_id,
            itemImg.filename
        )

        return this.responsesService.dataAdded();
    }

    @Roles({ roles: ["Next_admin"] })
    @UseInterceptors(FileInterceptor('file', { storage: storage(process.env["ITEMS_TEC_DRAW_PATH"]) }))
    @Post('tec-draw')
    async addItemTecDraw(
        @Headers() headers: HeaderDTO,
        @Body() itemImgInfo: AddItemImgDTO,
        @UploadedFile() tecDrawImg: Express.Multer.File
    ): Promise<NextResponse<undefined>> {

        await this.service.addItemTecDraw(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            itemImgInfo.item_id,
            tecDrawImg.filename
        )

        return this.responsesService.dataAdded();
    }

    @Roles({ roles: ["Next_admin"] })
    @UseInterceptors(FileInterceptor('file', { storage: storage(process.env["ITEMS_TOOLS_IMG_PATH"]) }))
    @Post('tool')
    async addItemToolImg(
        @Headers() headers: HeaderDTO,
        @Body() itemImgInfo: AddToolImgDTO,
        @UploadedFile() toolImg: Express.Multer.File
    ): Promise<NextResponse<undefined>> {

        await this.service.addToolImg(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            itemImgInfo.tool_id,
            toolImg.filename
        )

        return this.responsesService.dataAdded();
    }

}
