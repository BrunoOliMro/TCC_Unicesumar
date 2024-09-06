import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomizerService {

    generateRandomNumericString(stringLength: number): string {
        let resultingString = '';
        const chars = '0123456789';
        for (let i = 0; i < stringLength; i++) {
            const indiceAleatorio = Math.floor(Math.random() * chars.length);
            resultingString += chars[indiceAleatorio];
        }
        return resultingString;
    }


}
