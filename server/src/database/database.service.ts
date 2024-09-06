import { Injectable, OnModuleInit } from '@nestjs/common';
import datasource from './database.config';

@Injectable()
export class DatabaseService implements OnModuleInit {

    private datasource = datasource;

    async onModuleInit() {
        await this.datasource.initialize();
        console.log("Database initialized");
    }

}
