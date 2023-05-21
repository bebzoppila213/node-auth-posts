import { PrismaClient } from '@prisma/client'

export class BaseModel{

    protected client: PrismaClient;

    constructor(){
        this.client = new PrismaClient()
    }
}