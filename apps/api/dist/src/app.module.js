"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const expenses_module_1 = require("./expenses/expenses.module");
const prisma_module_1 = require("./prisma/prisma.module");
const categories_module_1 = require("./categories/categories.module");
const accounts_module_1 = require("./accounts/accounts.module");
const merchants_module_1 = require("./merchants/merchants.module");
const prisma_error_catch_1 = require("./exception-filter/prisma-error-catch");
const core_1 = require("@nestjs/core");
const http_error_catch_1 = require("./exception-filter/http-error-catch");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [expenses_module_1.ExpensesModule, prisma_module_1.PrismaModule, categories_module_1.CategoriesModule, accounts_module_1.AccountsModule, merchants_module_1.MerchantsModule],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: http_error_catch_1.CatchEverythingFilter
            },
            {
                provide: core_1.APP_FILTER,
                useClass: prisma_error_catch_1.PrismaErrorCatch
            }
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map