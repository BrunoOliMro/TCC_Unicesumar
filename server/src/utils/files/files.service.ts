import { Injectable } from '@nestjs/common';

import * as fs from "node:fs";
import * as path from "node:path";
@Injectable()
export class FilesService {

    checkIfFileExists(filePath: string): boolean {
        return fs.existsSync(filePath);
    }

    findToolImg(company: string, toolName: string): string {

        if (fs.existsSync(path.join(process.env["ITEMS_TOOLS_IMG_PATH"], company, `${toolName}.jpg`))) {
            return fs.readFileSync(path.join(process.env["ITEMS_TOOLS_IMG_PATH"], company, `${toolName}.jpg`)).toString('base64');
        } else {
            return fs.readFileSync(path.join(process.env["ITEMS_TOOLS_IMG_PATH"], `noImg.png`)).toString('base64');
        }

    }

    findItemImg(company: string, imgName: string): string {

        if (fs.existsSync(path.join(process.env["ITEMS_IMG_PATH"], company, `${imgName}.jpg`))) {
            return fs.readFileSync(path.join(process.env["ITEMS_IMG_PATH"], company, `${imgName}.jpg`)).toString('base64');
        } else {
            return fs.readFileSync(path.join(process.env["ITEMS_IMG_PATH"], `noImg.png`)).toString('base64');
        }

    }

    findItemTecDraw(company: string, imgName: string): string {

        if (fs.existsSync(path.join(process.env["ITEMS_TEC_DRAW_PATH"], company, `${imgName}.jpg`))) {
            return fs.readFileSync(path.join(process.env["ITEMS_TEC_DRAW_PATH"], company, `${imgName}.jpg`)).toString('base64');
        } else {
            return;
        }

    }

}
