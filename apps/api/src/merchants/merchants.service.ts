import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateMerchantsDTO } from "./dto/create-merchants-dto";

@Injectable()
export class MerchantsService {
    constructor(private readonly prisma:PrismaService) {}

    async createMerchant(merchant: CreateMerchantsDTO){
        const merchantCreation = this.prisma.merchant.create({
            data:{...merchant},
        })
        return merchantCreation;
    }

    async getMerchants(){
        const merchants = this.prisma.merchant.findMany();
        return merchants;
    }
}