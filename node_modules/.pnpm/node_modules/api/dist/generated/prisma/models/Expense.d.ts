import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ExpenseModel = runtime.Types.Result.DefaultSelection<Prisma.$ExpensePayload>;
export type AggregateExpense = {
    _count: ExpenseCountAggregateOutputType | null;
    _avg: ExpenseAvgAggregateOutputType | null;
    _sum: ExpenseSumAggregateOutputType | null;
    _min: ExpenseMinAggregateOutputType | null;
    _max: ExpenseMaxAggregateOutputType | null;
};
export type ExpenseAvgAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type ExpenseSumAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type ExpenseMinAggregateOutputType = {
    id: string | null;
    description: string | null;
    amount: runtime.Decimal | null;
    notes: string | null;
    status: $Enums.ExpenseStatus | null;
    date: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    categoryId: string | null;
    accountId: string | null;
    merchantId: string | null;
};
export type ExpenseMaxAggregateOutputType = {
    id: string | null;
    description: string | null;
    amount: runtime.Decimal | null;
    notes: string | null;
    status: $Enums.ExpenseStatus | null;
    date: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    categoryId: string | null;
    accountId: string | null;
    merchantId: string | null;
};
export type ExpenseCountAggregateOutputType = {
    id: number;
    description: number;
    amount: number;
    notes: number;
    status: number;
    date: number;
    createdAt: number;
    updatedAt: number;
    categoryId: number;
    accountId: number;
    merchantId: number;
    _all: number;
};
export type ExpenseAvgAggregateInputType = {
    amount?: true;
};
export type ExpenseSumAggregateInputType = {
    amount?: true;
};
export type ExpenseMinAggregateInputType = {
    id?: true;
    description?: true;
    amount?: true;
    notes?: true;
    status?: true;
    date?: true;
    createdAt?: true;
    updatedAt?: true;
    categoryId?: true;
    accountId?: true;
    merchantId?: true;
};
export type ExpenseMaxAggregateInputType = {
    id?: true;
    description?: true;
    amount?: true;
    notes?: true;
    status?: true;
    date?: true;
    createdAt?: true;
    updatedAt?: true;
    categoryId?: true;
    accountId?: true;
    merchantId?: true;
};
export type ExpenseCountAggregateInputType = {
    id?: true;
    description?: true;
    amount?: true;
    notes?: true;
    status?: true;
    date?: true;
    createdAt?: true;
    updatedAt?: true;
    categoryId?: true;
    accountId?: true;
    merchantId?: true;
    _all?: true;
};
export type ExpenseAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExpenseWhereInput;
    orderBy?: Prisma.ExpenseOrderByWithRelationInput | Prisma.ExpenseOrderByWithRelationInput[];
    cursor?: Prisma.ExpenseWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ExpenseCountAggregateInputType;
    _avg?: ExpenseAvgAggregateInputType;
    _sum?: ExpenseSumAggregateInputType;
    _min?: ExpenseMinAggregateInputType;
    _max?: ExpenseMaxAggregateInputType;
};
export type GetExpenseAggregateType<T extends ExpenseAggregateArgs> = {
    [P in keyof T & keyof AggregateExpense]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateExpense[P]> : Prisma.GetScalarType<T[P], AggregateExpense[P]>;
};
export type ExpenseGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExpenseWhereInput;
    orderBy?: Prisma.ExpenseOrderByWithAggregationInput | Prisma.ExpenseOrderByWithAggregationInput[];
    by: Prisma.ExpenseScalarFieldEnum[] | Prisma.ExpenseScalarFieldEnum;
    having?: Prisma.ExpenseScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ExpenseCountAggregateInputType | true;
    _avg?: ExpenseAvgAggregateInputType;
    _sum?: ExpenseSumAggregateInputType;
    _min?: ExpenseMinAggregateInputType;
    _max?: ExpenseMaxAggregateInputType;
};
export type ExpenseGroupByOutputType = {
    id: string;
    description: string;
    amount: runtime.Decimal;
    notes: string | null;
    status: $Enums.ExpenseStatus;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
    categoryId: string;
    accountId: string;
    merchantId: string;
    _count: ExpenseCountAggregateOutputType | null;
    _avg: ExpenseAvgAggregateOutputType | null;
    _sum: ExpenseSumAggregateOutputType | null;
    _min: ExpenseMinAggregateOutputType | null;
    _max: ExpenseMaxAggregateOutputType | null;
};
export type GetExpenseGroupByPayload<T extends ExpenseGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ExpenseGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ExpenseGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ExpenseGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ExpenseGroupByOutputType[P]>;
}>>;
export type ExpenseWhereInput = {
    AND?: Prisma.ExpenseWhereInput | Prisma.ExpenseWhereInput[];
    OR?: Prisma.ExpenseWhereInput[];
    NOT?: Prisma.ExpenseWhereInput | Prisma.ExpenseWhereInput[];
    id?: Prisma.StringFilter<"Expense"> | string;
    description?: Prisma.StringFilter<"Expense"> | string;
    amount?: Prisma.DecimalFilter<"Expense"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableFilter<"Expense"> | string | null;
    status?: Prisma.EnumExpenseStatusFilter<"Expense"> | $Enums.ExpenseStatus;
    date?: Prisma.DateTimeFilter<"Expense"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"Expense"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Expense"> | Date | string;
    categoryId?: Prisma.StringFilter<"Expense"> | string;
    accountId?: Prisma.StringFilter<"Expense"> | string;
    merchantId?: Prisma.StringFilter<"Expense"> | string;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
    merchant?: Prisma.XOR<Prisma.MerchantScalarRelationFilter, Prisma.MerchantWhereInput>;
};
export type ExpenseOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    merchantId?: Prisma.SortOrder;
    category?: Prisma.CategoryOrderByWithRelationInput;
    account?: Prisma.AccountOrderByWithRelationInput;
    merchant?: Prisma.MerchantOrderByWithRelationInput;
};
export type ExpenseWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ExpenseWhereInput | Prisma.ExpenseWhereInput[];
    OR?: Prisma.ExpenseWhereInput[];
    NOT?: Prisma.ExpenseWhereInput | Prisma.ExpenseWhereInput[];
    description?: Prisma.StringFilter<"Expense"> | string;
    amount?: Prisma.DecimalFilter<"Expense"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableFilter<"Expense"> | string | null;
    status?: Prisma.EnumExpenseStatusFilter<"Expense"> | $Enums.ExpenseStatus;
    date?: Prisma.DateTimeFilter<"Expense"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"Expense"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Expense"> | Date | string;
    categoryId?: Prisma.StringFilter<"Expense"> | string;
    accountId?: Prisma.StringFilter<"Expense"> | string;
    merchantId?: Prisma.StringFilter<"Expense"> | string;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
    account?: Prisma.XOR<Prisma.AccountScalarRelationFilter, Prisma.AccountWhereInput>;
    merchant?: Prisma.XOR<Prisma.MerchantScalarRelationFilter, Prisma.MerchantWhereInput>;
}, "id">;
export type ExpenseOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    merchantId?: Prisma.SortOrder;
    _count?: Prisma.ExpenseCountOrderByAggregateInput;
    _avg?: Prisma.ExpenseAvgOrderByAggregateInput;
    _max?: Prisma.ExpenseMaxOrderByAggregateInput;
    _min?: Prisma.ExpenseMinOrderByAggregateInput;
    _sum?: Prisma.ExpenseSumOrderByAggregateInput;
};
export type ExpenseScalarWhereWithAggregatesInput = {
    AND?: Prisma.ExpenseScalarWhereWithAggregatesInput | Prisma.ExpenseScalarWhereWithAggregatesInput[];
    OR?: Prisma.ExpenseScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ExpenseScalarWhereWithAggregatesInput | Prisma.ExpenseScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Expense"> | string;
    description?: Prisma.StringWithAggregatesFilter<"Expense"> | string;
    amount?: Prisma.DecimalWithAggregatesFilter<"Expense"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableWithAggregatesFilter<"Expense"> | string | null;
    status?: Prisma.EnumExpenseStatusWithAggregatesFilter<"Expense"> | $Enums.ExpenseStatus;
    date?: Prisma.DateTimeWithAggregatesFilter<"Expense"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Expense"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Expense"> | Date | string;
    categoryId?: Prisma.StringWithAggregatesFilter<"Expense"> | string;
    accountId?: Prisma.StringWithAggregatesFilter<"Expense"> | string;
    merchantId?: Prisma.StringWithAggregatesFilter<"Expense"> | string;
};
export type ExpenseCreateInput = {
    id?: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    status?: $Enums.ExpenseStatus;
    date?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category: Prisma.CategoryCreateNestedOneWithoutExpenseInput;
    account: Prisma.AccountCreateNestedOneWithoutExpenseInput;
    merchant: Prisma.MerchantCreateNestedOneWithoutExpenseInput;
};
export type ExpenseUncheckedCreateInput = {
    id?: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    status?: $Enums.ExpenseStatus;
    date?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categoryId: string;
    accountId: string;
    merchantId: string;
};
export type ExpenseUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneRequiredWithoutExpenseNestedInput;
    account?: Prisma.AccountUpdateOneRequiredWithoutExpenseNestedInput;
    merchant?: Prisma.MerchantUpdateOneRequiredWithoutExpenseNestedInput;
};
export type ExpenseUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string;
    merchantId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ExpenseCreateManyInput = {
    id?: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    status?: $Enums.ExpenseStatus;
    date?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categoryId: string;
    accountId: string;
    merchantId: string;
};
export type ExpenseUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExpenseUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string;
    merchantId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ExpenseListRelationFilter = {
    every?: Prisma.ExpenseWhereInput;
    some?: Prisma.ExpenseWhereInput;
    none?: Prisma.ExpenseWhereInput;
};
export type ExpenseOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ExpenseCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    merchantId?: Prisma.SortOrder;
};
export type ExpenseAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type ExpenseMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    merchantId?: Prisma.SortOrder;
};
export type ExpenseMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    merchantId?: Prisma.SortOrder;
};
export type ExpenseSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type ExpenseCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutCategoryInput, Prisma.ExpenseUncheckedCreateWithoutCategoryInput> | Prisma.ExpenseCreateWithoutCategoryInput[] | Prisma.ExpenseUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutCategoryInput | Prisma.ExpenseCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.ExpenseCreateManyCategoryInputEnvelope;
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
};
export type ExpenseUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutCategoryInput, Prisma.ExpenseUncheckedCreateWithoutCategoryInput> | Prisma.ExpenseCreateWithoutCategoryInput[] | Prisma.ExpenseUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutCategoryInput | Prisma.ExpenseCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.ExpenseCreateManyCategoryInputEnvelope;
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
};
export type ExpenseUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutCategoryInput, Prisma.ExpenseUncheckedCreateWithoutCategoryInput> | Prisma.ExpenseCreateWithoutCategoryInput[] | Prisma.ExpenseUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutCategoryInput | Prisma.ExpenseCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.ExpenseUpsertWithWhereUniqueWithoutCategoryInput | Prisma.ExpenseUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.ExpenseCreateManyCategoryInputEnvelope;
    set?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    disconnect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    delete?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    update?: Prisma.ExpenseUpdateWithWhereUniqueWithoutCategoryInput | Prisma.ExpenseUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.ExpenseUpdateManyWithWhereWithoutCategoryInput | Prisma.ExpenseUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.ExpenseScalarWhereInput | Prisma.ExpenseScalarWhereInput[];
};
export type ExpenseUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutCategoryInput, Prisma.ExpenseUncheckedCreateWithoutCategoryInput> | Prisma.ExpenseCreateWithoutCategoryInput[] | Prisma.ExpenseUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutCategoryInput | Prisma.ExpenseCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.ExpenseUpsertWithWhereUniqueWithoutCategoryInput | Prisma.ExpenseUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.ExpenseCreateManyCategoryInputEnvelope;
    set?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    disconnect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    delete?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    update?: Prisma.ExpenseUpdateWithWhereUniqueWithoutCategoryInput | Prisma.ExpenseUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.ExpenseUpdateManyWithWhereWithoutCategoryInput | Prisma.ExpenseUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.ExpenseScalarWhereInput | Prisma.ExpenseScalarWhereInput[];
};
export type ExpenseCreateNestedManyWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutAccountInput, Prisma.ExpenseUncheckedCreateWithoutAccountInput> | Prisma.ExpenseCreateWithoutAccountInput[] | Prisma.ExpenseUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutAccountInput | Prisma.ExpenseCreateOrConnectWithoutAccountInput[];
    createMany?: Prisma.ExpenseCreateManyAccountInputEnvelope;
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
};
export type ExpenseUncheckedCreateNestedManyWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutAccountInput, Prisma.ExpenseUncheckedCreateWithoutAccountInput> | Prisma.ExpenseCreateWithoutAccountInput[] | Prisma.ExpenseUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutAccountInput | Prisma.ExpenseCreateOrConnectWithoutAccountInput[];
    createMany?: Prisma.ExpenseCreateManyAccountInputEnvelope;
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
};
export type ExpenseUpdateManyWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutAccountInput, Prisma.ExpenseUncheckedCreateWithoutAccountInput> | Prisma.ExpenseCreateWithoutAccountInput[] | Prisma.ExpenseUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutAccountInput | Prisma.ExpenseCreateOrConnectWithoutAccountInput[];
    upsert?: Prisma.ExpenseUpsertWithWhereUniqueWithoutAccountInput | Prisma.ExpenseUpsertWithWhereUniqueWithoutAccountInput[];
    createMany?: Prisma.ExpenseCreateManyAccountInputEnvelope;
    set?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    disconnect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    delete?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    update?: Prisma.ExpenseUpdateWithWhereUniqueWithoutAccountInput | Prisma.ExpenseUpdateWithWhereUniqueWithoutAccountInput[];
    updateMany?: Prisma.ExpenseUpdateManyWithWhereWithoutAccountInput | Prisma.ExpenseUpdateManyWithWhereWithoutAccountInput[];
    deleteMany?: Prisma.ExpenseScalarWhereInput | Prisma.ExpenseScalarWhereInput[];
};
export type ExpenseUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutAccountInput, Prisma.ExpenseUncheckedCreateWithoutAccountInput> | Prisma.ExpenseCreateWithoutAccountInput[] | Prisma.ExpenseUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutAccountInput | Prisma.ExpenseCreateOrConnectWithoutAccountInput[];
    upsert?: Prisma.ExpenseUpsertWithWhereUniqueWithoutAccountInput | Prisma.ExpenseUpsertWithWhereUniqueWithoutAccountInput[];
    createMany?: Prisma.ExpenseCreateManyAccountInputEnvelope;
    set?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    disconnect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    delete?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    update?: Prisma.ExpenseUpdateWithWhereUniqueWithoutAccountInput | Prisma.ExpenseUpdateWithWhereUniqueWithoutAccountInput[];
    updateMany?: Prisma.ExpenseUpdateManyWithWhereWithoutAccountInput | Prisma.ExpenseUpdateManyWithWhereWithoutAccountInput[];
    deleteMany?: Prisma.ExpenseScalarWhereInput | Prisma.ExpenseScalarWhereInput[];
};
export type ExpenseCreateNestedManyWithoutMerchantInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutMerchantInput, Prisma.ExpenseUncheckedCreateWithoutMerchantInput> | Prisma.ExpenseCreateWithoutMerchantInput[] | Prisma.ExpenseUncheckedCreateWithoutMerchantInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutMerchantInput | Prisma.ExpenseCreateOrConnectWithoutMerchantInput[];
    createMany?: Prisma.ExpenseCreateManyMerchantInputEnvelope;
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
};
export type ExpenseUncheckedCreateNestedManyWithoutMerchantInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutMerchantInput, Prisma.ExpenseUncheckedCreateWithoutMerchantInput> | Prisma.ExpenseCreateWithoutMerchantInput[] | Prisma.ExpenseUncheckedCreateWithoutMerchantInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutMerchantInput | Prisma.ExpenseCreateOrConnectWithoutMerchantInput[];
    createMany?: Prisma.ExpenseCreateManyMerchantInputEnvelope;
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
};
export type ExpenseUpdateManyWithoutMerchantNestedInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutMerchantInput, Prisma.ExpenseUncheckedCreateWithoutMerchantInput> | Prisma.ExpenseCreateWithoutMerchantInput[] | Prisma.ExpenseUncheckedCreateWithoutMerchantInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutMerchantInput | Prisma.ExpenseCreateOrConnectWithoutMerchantInput[];
    upsert?: Prisma.ExpenseUpsertWithWhereUniqueWithoutMerchantInput | Prisma.ExpenseUpsertWithWhereUniqueWithoutMerchantInput[];
    createMany?: Prisma.ExpenseCreateManyMerchantInputEnvelope;
    set?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    disconnect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    delete?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    update?: Prisma.ExpenseUpdateWithWhereUniqueWithoutMerchantInput | Prisma.ExpenseUpdateWithWhereUniqueWithoutMerchantInput[];
    updateMany?: Prisma.ExpenseUpdateManyWithWhereWithoutMerchantInput | Prisma.ExpenseUpdateManyWithWhereWithoutMerchantInput[];
    deleteMany?: Prisma.ExpenseScalarWhereInput | Prisma.ExpenseScalarWhereInput[];
};
export type ExpenseUncheckedUpdateManyWithoutMerchantNestedInput = {
    create?: Prisma.XOR<Prisma.ExpenseCreateWithoutMerchantInput, Prisma.ExpenseUncheckedCreateWithoutMerchantInput> | Prisma.ExpenseCreateWithoutMerchantInput[] | Prisma.ExpenseUncheckedCreateWithoutMerchantInput[];
    connectOrCreate?: Prisma.ExpenseCreateOrConnectWithoutMerchantInput | Prisma.ExpenseCreateOrConnectWithoutMerchantInput[];
    upsert?: Prisma.ExpenseUpsertWithWhereUniqueWithoutMerchantInput | Prisma.ExpenseUpsertWithWhereUniqueWithoutMerchantInput[];
    createMany?: Prisma.ExpenseCreateManyMerchantInputEnvelope;
    set?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    disconnect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    delete?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    connect?: Prisma.ExpenseWhereUniqueInput | Prisma.ExpenseWhereUniqueInput[];
    update?: Prisma.ExpenseUpdateWithWhereUniqueWithoutMerchantInput | Prisma.ExpenseUpdateWithWhereUniqueWithoutMerchantInput[];
    updateMany?: Prisma.ExpenseUpdateManyWithWhereWithoutMerchantInput | Prisma.ExpenseUpdateManyWithWhereWithoutMerchantInput[];
    deleteMany?: Prisma.ExpenseScalarWhereInput | Prisma.ExpenseScalarWhereInput[];
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type EnumExpenseStatusFieldUpdateOperationsInput = {
    set?: $Enums.ExpenseStatus;
};
export type ExpenseCreateWithoutCategoryInput = {
    id?: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    status?: $Enums.ExpenseStatus;
    date?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    account: Prisma.AccountCreateNestedOneWithoutExpenseInput;
    merchant: Prisma.MerchantCreateNestedOneWithoutExpenseInput;
};
export type ExpenseUncheckedCreateWithoutCategoryInput = {
    id?: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    status?: $Enums.ExpenseStatus;
    date?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accountId: string;
    merchantId: string;
};
export type ExpenseCreateOrConnectWithoutCategoryInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExpenseCreateWithoutCategoryInput, Prisma.ExpenseUncheckedCreateWithoutCategoryInput>;
};
export type ExpenseCreateManyCategoryInputEnvelope = {
    data: Prisma.ExpenseCreateManyCategoryInput | Prisma.ExpenseCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type ExpenseUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExpenseUpdateWithoutCategoryInput, Prisma.ExpenseUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.ExpenseCreateWithoutCategoryInput, Prisma.ExpenseUncheckedCreateWithoutCategoryInput>;
};
export type ExpenseUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExpenseUpdateWithoutCategoryInput, Prisma.ExpenseUncheckedUpdateWithoutCategoryInput>;
};
export type ExpenseUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.ExpenseScalarWhereInput;
    data: Prisma.XOR<Prisma.ExpenseUpdateManyMutationInput, Prisma.ExpenseUncheckedUpdateManyWithoutCategoryInput>;
};
export type ExpenseScalarWhereInput = {
    AND?: Prisma.ExpenseScalarWhereInput | Prisma.ExpenseScalarWhereInput[];
    OR?: Prisma.ExpenseScalarWhereInput[];
    NOT?: Prisma.ExpenseScalarWhereInput | Prisma.ExpenseScalarWhereInput[];
    id?: Prisma.StringFilter<"Expense"> | string;
    description?: Prisma.StringFilter<"Expense"> | string;
    amount?: Prisma.DecimalFilter<"Expense"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableFilter<"Expense"> | string | null;
    status?: Prisma.EnumExpenseStatusFilter<"Expense"> | $Enums.ExpenseStatus;
    date?: Prisma.DateTimeFilter<"Expense"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"Expense"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Expense"> | Date | string;
    categoryId?: Prisma.StringFilter<"Expense"> | string;
    accountId?: Prisma.StringFilter<"Expense"> | string;
    merchantId?: Prisma.StringFilter<"Expense"> | string;
};
export type ExpenseCreateWithoutAccountInput = {
    id?: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    status?: $Enums.ExpenseStatus;
    date?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category: Prisma.CategoryCreateNestedOneWithoutExpenseInput;
    merchant: Prisma.MerchantCreateNestedOneWithoutExpenseInput;
};
export type ExpenseUncheckedCreateWithoutAccountInput = {
    id?: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    status?: $Enums.ExpenseStatus;
    date?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categoryId: string;
    merchantId: string;
};
export type ExpenseCreateOrConnectWithoutAccountInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExpenseCreateWithoutAccountInput, Prisma.ExpenseUncheckedCreateWithoutAccountInput>;
};
export type ExpenseCreateManyAccountInputEnvelope = {
    data: Prisma.ExpenseCreateManyAccountInput | Prisma.ExpenseCreateManyAccountInput[];
    skipDuplicates?: boolean;
};
export type ExpenseUpsertWithWhereUniqueWithoutAccountInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExpenseUpdateWithoutAccountInput, Prisma.ExpenseUncheckedUpdateWithoutAccountInput>;
    create: Prisma.XOR<Prisma.ExpenseCreateWithoutAccountInput, Prisma.ExpenseUncheckedCreateWithoutAccountInput>;
};
export type ExpenseUpdateWithWhereUniqueWithoutAccountInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExpenseUpdateWithoutAccountInput, Prisma.ExpenseUncheckedUpdateWithoutAccountInput>;
};
export type ExpenseUpdateManyWithWhereWithoutAccountInput = {
    where: Prisma.ExpenseScalarWhereInput;
    data: Prisma.XOR<Prisma.ExpenseUpdateManyMutationInput, Prisma.ExpenseUncheckedUpdateManyWithoutAccountInput>;
};
export type ExpenseCreateWithoutMerchantInput = {
    id?: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    status?: $Enums.ExpenseStatus;
    date?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category: Prisma.CategoryCreateNestedOneWithoutExpenseInput;
    account: Prisma.AccountCreateNestedOneWithoutExpenseInput;
};
export type ExpenseUncheckedCreateWithoutMerchantInput = {
    id?: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    status?: $Enums.ExpenseStatus;
    date?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categoryId: string;
    accountId: string;
};
export type ExpenseCreateOrConnectWithoutMerchantInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExpenseCreateWithoutMerchantInput, Prisma.ExpenseUncheckedCreateWithoutMerchantInput>;
};
export type ExpenseCreateManyMerchantInputEnvelope = {
    data: Prisma.ExpenseCreateManyMerchantInput | Prisma.ExpenseCreateManyMerchantInput[];
    skipDuplicates?: boolean;
};
export type ExpenseUpsertWithWhereUniqueWithoutMerchantInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExpenseUpdateWithoutMerchantInput, Prisma.ExpenseUncheckedUpdateWithoutMerchantInput>;
    create: Prisma.XOR<Prisma.ExpenseCreateWithoutMerchantInput, Prisma.ExpenseUncheckedCreateWithoutMerchantInput>;
};
export type ExpenseUpdateWithWhereUniqueWithoutMerchantInput = {
    where: Prisma.ExpenseWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExpenseUpdateWithoutMerchantInput, Prisma.ExpenseUncheckedUpdateWithoutMerchantInput>;
};
export type ExpenseUpdateManyWithWhereWithoutMerchantInput = {
    where: Prisma.ExpenseScalarWhereInput;
    data: Prisma.XOR<Prisma.ExpenseUpdateManyMutationInput, Prisma.ExpenseUncheckedUpdateManyWithoutMerchantInput>;
};
export type ExpenseCreateManyCategoryInput = {
    id?: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    status?: $Enums.ExpenseStatus;
    date?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accountId: string;
    merchantId: string;
};
export type ExpenseUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    account?: Prisma.AccountUpdateOneRequiredWithoutExpenseNestedInput;
    merchant?: Prisma.MerchantUpdateOneRequiredWithoutExpenseNestedInput;
};
export type ExpenseUncheckedUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string;
    merchantId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ExpenseUncheckedUpdateManyWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string;
    merchantId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ExpenseCreateManyAccountInput = {
    id?: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    status?: $Enums.ExpenseStatus;
    date?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categoryId: string;
    merchantId: string;
};
export type ExpenseUpdateWithoutAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneRequiredWithoutExpenseNestedInput;
    merchant?: Prisma.MerchantUpdateOneRequiredWithoutExpenseNestedInput;
};
export type ExpenseUncheckedUpdateWithoutAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    merchantId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ExpenseUncheckedUpdateManyWithoutAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    merchantId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ExpenseCreateManyMerchantInput = {
    id?: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    status?: $Enums.ExpenseStatus;
    date?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categoryId: string;
    accountId: string;
};
export type ExpenseUpdateWithoutMerchantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneRequiredWithoutExpenseNestedInput;
    account?: Prisma.AccountUpdateOneRequiredWithoutExpenseNestedInput;
};
export type ExpenseUncheckedUpdateWithoutMerchantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ExpenseUncheckedUpdateManyWithoutMerchantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumExpenseStatusFieldUpdateOperationsInput | $Enums.ExpenseStatus;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ExpenseSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    description?: boolean;
    amount?: boolean;
    notes?: boolean;
    status?: boolean;
    date?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    categoryId?: boolean;
    accountId?: boolean;
    merchantId?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    merchant?: boolean | Prisma.MerchantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["expense"]>;
export type ExpenseSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    description?: boolean;
    amount?: boolean;
    notes?: boolean;
    status?: boolean;
    date?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    categoryId?: boolean;
    accountId?: boolean;
    merchantId?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    merchant?: boolean | Prisma.MerchantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["expense"]>;
export type ExpenseSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    description?: boolean;
    amount?: boolean;
    notes?: boolean;
    status?: boolean;
    date?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    categoryId?: boolean;
    accountId?: boolean;
    merchantId?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    merchant?: boolean | Prisma.MerchantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["expense"]>;
export type ExpenseSelectScalar = {
    id?: boolean;
    description?: boolean;
    amount?: boolean;
    notes?: boolean;
    status?: boolean;
    date?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    categoryId?: boolean;
    accountId?: boolean;
    merchantId?: boolean;
};
export type ExpenseOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "description" | "amount" | "notes" | "status" | "date" | "createdAt" | "updatedAt" | "categoryId" | "accountId" | "merchantId", ExtArgs["result"]["expense"]>;
export type ExpenseInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    merchant?: boolean | Prisma.MerchantDefaultArgs<ExtArgs>;
};
export type ExpenseIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    merchant?: boolean | Prisma.MerchantDefaultArgs<ExtArgs>;
};
export type ExpenseIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    account?: boolean | Prisma.AccountDefaultArgs<ExtArgs>;
    merchant?: boolean | Prisma.MerchantDefaultArgs<ExtArgs>;
};
export type $ExpensePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Expense";
    objects: {
        category: Prisma.$CategoryPayload<ExtArgs>;
        account: Prisma.$AccountPayload<ExtArgs>;
        merchant: Prisma.$MerchantPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        description: string;
        amount: runtime.Decimal;
        notes: string | null;
        status: $Enums.ExpenseStatus;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
        accountId: string;
        merchantId: string;
    }, ExtArgs["result"]["expense"]>;
    composites: {};
};
export type ExpenseGetPayload<S extends boolean | null | undefined | ExpenseDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ExpensePayload, S>;
export type ExpenseCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ExpenseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ExpenseCountAggregateInputType | true;
};
export interface ExpenseDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Expense'];
        meta: {
            name: 'Expense';
        };
    };
    findUnique<T extends ExpenseFindUniqueArgs>(args: Prisma.SelectSubset<T, ExpenseFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ExpenseClient<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ExpenseFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ExpenseFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExpenseClient<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ExpenseFindFirstArgs>(args?: Prisma.SelectSubset<T, ExpenseFindFirstArgs<ExtArgs>>): Prisma.Prisma__ExpenseClient<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ExpenseFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ExpenseFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExpenseClient<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ExpenseFindManyArgs>(args?: Prisma.SelectSubset<T, ExpenseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ExpenseCreateArgs>(args: Prisma.SelectSubset<T, ExpenseCreateArgs<ExtArgs>>): Prisma.Prisma__ExpenseClient<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ExpenseCreateManyArgs>(args?: Prisma.SelectSubset<T, ExpenseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ExpenseCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ExpenseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ExpenseDeleteArgs>(args: Prisma.SelectSubset<T, ExpenseDeleteArgs<ExtArgs>>): Prisma.Prisma__ExpenseClient<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ExpenseUpdateArgs>(args: Prisma.SelectSubset<T, ExpenseUpdateArgs<ExtArgs>>): Prisma.Prisma__ExpenseClient<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ExpenseDeleteManyArgs>(args?: Prisma.SelectSubset<T, ExpenseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ExpenseUpdateManyArgs>(args: Prisma.SelectSubset<T, ExpenseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ExpenseUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ExpenseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ExpenseUpsertArgs>(args: Prisma.SelectSubset<T, ExpenseUpsertArgs<ExtArgs>>): Prisma.Prisma__ExpenseClient<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ExpenseCountArgs>(args?: Prisma.Subset<T, ExpenseCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ExpenseCountAggregateOutputType> : number>;
    aggregate<T extends ExpenseAggregateArgs>(args: Prisma.Subset<T, ExpenseAggregateArgs>): Prisma.PrismaPromise<GetExpenseAggregateType<T>>;
    groupBy<T extends ExpenseGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ExpenseGroupByArgs['orderBy'];
    } : {
        orderBy?: ExpenseGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ExpenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ExpenseFieldRefs;
}
export interface Prisma__ExpenseClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    category<T extends Prisma.CategoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CategoryDefaultArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    account<T extends Prisma.AccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AccountDefaultArgs<ExtArgs>>): Prisma.Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    merchant<T extends Prisma.MerchantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MerchantDefaultArgs<ExtArgs>>): Prisma.Prisma__MerchantClient<runtime.Types.Result.GetResult<Prisma.$MerchantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ExpenseFieldRefs {
    readonly id: Prisma.FieldRef<"Expense", 'String'>;
    readonly description: Prisma.FieldRef<"Expense", 'String'>;
    readonly amount: Prisma.FieldRef<"Expense", 'Decimal'>;
    readonly notes: Prisma.FieldRef<"Expense", 'String'>;
    readonly status: Prisma.FieldRef<"Expense", 'ExpenseStatus'>;
    readonly date: Prisma.FieldRef<"Expense", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Expense", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Expense", 'DateTime'>;
    readonly categoryId: Prisma.FieldRef<"Expense", 'String'>;
    readonly accountId: Prisma.FieldRef<"Expense", 'String'>;
    readonly merchantId: Prisma.FieldRef<"Expense", 'String'>;
}
export type ExpenseFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExpenseSelect<ExtArgs> | null;
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    include?: Prisma.ExpenseInclude<ExtArgs> | null;
    where: Prisma.ExpenseWhereUniqueInput;
};
export type ExpenseFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExpenseSelect<ExtArgs> | null;
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    include?: Prisma.ExpenseInclude<ExtArgs> | null;
    where: Prisma.ExpenseWhereUniqueInput;
};
export type ExpenseFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExpenseSelect<ExtArgs> | null;
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    include?: Prisma.ExpenseInclude<ExtArgs> | null;
    where?: Prisma.ExpenseWhereInput;
    orderBy?: Prisma.ExpenseOrderByWithRelationInput | Prisma.ExpenseOrderByWithRelationInput[];
    cursor?: Prisma.ExpenseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExpenseScalarFieldEnum | Prisma.ExpenseScalarFieldEnum[];
};
export type ExpenseFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExpenseSelect<ExtArgs> | null;
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    include?: Prisma.ExpenseInclude<ExtArgs> | null;
    where?: Prisma.ExpenseWhereInput;
    orderBy?: Prisma.ExpenseOrderByWithRelationInput | Prisma.ExpenseOrderByWithRelationInput[];
    cursor?: Prisma.ExpenseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExpenseScalarFieldEnum | Prisma.ExpenseScalarFieldEnum[];
};
export type ExpenseFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExpenseSelect<ExtArgs> | null;
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    include?: Prisma.ExpenseInclude<ExtArgs> | null;
    where?: Prisma.ExpenseWhereInput;
    orderBy?: Prisma.ExpenseOrderByWithRelationInput | Prisma.ExpenseOrderByWithRelationInput[];
    cursor?: Prisma.ExpenseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExpenseScalarFieldEnum | Prisma.ExpenseScalarFieldEnum[];
};
export type ExpenseCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExpenseSelect<ExtArgs> | null;
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    include?: Prisma.ExpenseInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExpenseCreateInput, Prisma.ExpenseUncheckedCreateInput>;
};
export type ExpenseCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ExpenseCreateManyInput | Prisma.ExpenseCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ExpenseCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExpenseSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    data: Prisma.ExpenseCreateManyInput | Prisma.ExpenseCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ExpenseIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ExpenseUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExpenseSelect<ExtArgs> | null;
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    include?: Prisma.ExpenseInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExpenseUpdateInput, Prisma.ExpenseUncheckedUpdateInput>;
    where: Prisma.ExpenseWhereUniqueInput;
};
export type ExpenseUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ExpenseUpdateManyMutationInput, Prisma.ExpenseUncheckedUpdateManyInput>;
    where?: Prisma.ExpenseWhereInput;
    limit?: number;
};
export type ExpenseUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExpenseSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExpenseUpdateManyMutationInput, Prisma.ExpenseUncheckedUpdateManyInput>;
    where?: Prisma.ExpenseWhereInput;
    limit?: number;
    include?: Prisma.ExpenseIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ExpenseUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExpenseSelect<ExtArgs> | null;
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    include?: Prisma.ExpenseInclude<ExtArgs> | null;
    where: Prisma.ExpenseWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExpenseCreateInput, Prisma.ExpenseUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ExpenseUpdateInput, Prisma.ExpenseUncheckedUpdateInput>;
};
export type ExpenseDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExpenseSelect<ExtArgs> | null;
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    include?: Prisma.ExpenseInclude<ExtArgs> | null;
    where: Prisma.ExpenseWhereUniqueInput;
};
export type ExpenseDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExpenseWhereInput;
    limit?: number;
};
export type ExpenseDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExpenseSelect<ExtArgs> | null;
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    include?: Prisma.ExpenseInclude<ExtArgs> | null;
};
