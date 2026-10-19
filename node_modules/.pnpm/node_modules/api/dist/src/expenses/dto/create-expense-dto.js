"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateExpenseDTO = void 0;
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../generated/prisma/enums");
const class_transformer_1 = require("class-transformer");
class CreateExpenseDTO {
    description;
    amount;
    categoryId;
    accountId;
    merchantId;
    notes;
    status;
    date;
}
exports.CreateExpenseDTO = CreateExpenseDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateExpenseDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateExpenseDTO.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('all'),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateExpenseDTO.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('all'),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateExpenseDTO.prototype, "accountId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('all'),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateExpenseDTO.prototype, "merchantId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateExpenseDTO.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.ExpenseStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateExpenseDTO.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateExpenseDTO.prototype, "date", void 0);
//# sourceMappingURL=create-expense-dto.js.map