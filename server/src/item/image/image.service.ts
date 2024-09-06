import { HttpException, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import axios from "axios";
import { AxiosService } from '../../utils/axios/axios.service';
import { CompaniesService } from '../../companies/companies.service';
import { ResponseService } from '../../utils/response/response.service';
import { ItemService } from '../item.service';
import * as fs from "fs";
import { join } from "path";
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as AWS from "aws-sdk";
import { FilesService } from '../../utils/files/files.service';
import { ToolsService } from '../../tools/tools.service';

@Injectable()
export class ImageService implements OnModuleInit {

    constructor(
        @Inject(AxiosService) private axiosService: AxiosService,
        @Inject(CompaniesService) private companiesService: CompaniesService,
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(ItemService) private itemService: ItemService,
        @Inject(FilesService) private filesService: FilesService,
        @Inject(ToolsService) private toolService: ToolsService
    ) { }

    async onModuleInit() {

    }

    async findToolImgById(companyId: number, toolId: number): Promise<string> {

        return "img"

    }

    async findItemImgById(companyId: number, itemId: number): Promise<string> {

        return "img"

    }

    async findItemTecDrawById(companyId: number, itemId: number): Promise<string> {

        return "img"

    }

    async addItemTecDraw(
        companyId: number,
        itemId: number,
        itemTecDrawImgName: string
    ): Promise<void> {

        return;

    }

    async addItemImg(
        companyId: number,
        itemId: number,
        itemImgName: string,
    ): Promise<void> {

        return;

    }

    async addToolImg(
        companyId: number,
        toolId: number,
        toolImgName: string
    ): Promise<void> {

        return;

    }

}
