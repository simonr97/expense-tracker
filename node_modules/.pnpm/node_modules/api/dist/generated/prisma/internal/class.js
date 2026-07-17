"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.8.0",
    "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel Category {\n  id      String    @id @default(uuid())\n  name    String    @unique\n  expense Expense[]\n}\n\nmodel Expense {\n  id          String   @id @default(uuid())\n  description String\n  amount      Decimal  @db.Decimal(10, 2)\n  date        DateTime @default(now())\n  createdAt   DateTime @default(now())\n\n  categoryId String\n  category   Category @relation(fields: [categoryId], references: [id])\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"Category\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expense\",\"kind\":\"object\",\"type\":\"Expense\",\"relationName\":\"CategoryToExpense\"}],\"dbName\":null},\"Expense\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"amount\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"date\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"categoryId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"category\",\"kind\":\"object\",\"type\":\"Category\",\"relationName\":\"CategoryToExpense\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"orderBy\",\"cursor\",\"category\",\"expense\",\"_count\",\"Category.findUnique\",\"Category.findUniqueOrThrow\",\"Category.findFirst\",\"Category.findFirstOrThrow\",\"Category.findMany\",\"data\",\"Category.createOne\",\"Category.createMany\",\"Category.createManyAndReturn\",\"Category.updateOne\",\"Category.updateMany\",\"Category.updateManyAndReturn\",\"create\",\"update\",\"Category.upsertOne\",\"Category.deleteOne\",\"Category.deleteMany\",\"having\",\"_min\",\"_max\",\"Category.groupBy\",\"Category.aggregate\",\"Expense.findUnique\",\"Expense.findUniqueOrThrow\",\"Expense.findFirst\",\"Expense.findFirstOrThrow\",\"Expense.findMany\",\"Expense.createOne\",\"Expense.createMany\",\"Expense.createManyAndReturn\",\"Expense.updateOne\",\"Expense.updateMany\",\"Expense.updateManyAndReturn\",\"Expense.upsertOne\",\"Expense.deleteOne\",\"Expense.deleteMany\",\"_avg\",\"_sum\",\"Expense.groupBy\",\"Expense.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"description\",\"amount\",\"date\",\"createdAt\",\"categoryId\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"name\",\"every\",\"some\",\"none\",\"is\",\"isNot\",\"connectOrCreate\",\"upsert\",\"createMany\",\"set\",\"disconnect\",\"delete\",\"connect\",\"updateMany\",\"deleteMany\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "ahQgBgQAAEMAIC4AAEEAMC8AAAkAEDAAAEEAMDEBAAAAAUIBAAAAAQEAAAABACAKAwAARwAgLgAARAAwLwAAAwAQMAAARAAwMQEAQgAhMgEAQgAhMxAARQAhNEAARgAhNUAARgAhNgEAQgAhAQMAAGQAIAoDAABHACAuAABEADAvAAADABAwAABEADAxAQAAAAEyAQBCACEzEABFACE0QABGACE1QABGACE2AQBCACEDAAAAAwAgAQAABAAwAgAABQAgAQAAAAMAIAEAAAABACAGBAAAQwAgLgAAQQAwLwAACQAQMAAAQQAwMQEAQgAhQgEAQgAhAQQAAGMAIAMAAAAJACABAAAKADACAAABACADAAAACQAgAQAACgAwAgAAAQAgAwAAAAkAIAEAAAoAMAIAAAEAIAMEAABiACAxAQAAAAFCAQAAAAEBCwAADgAgAjEBAAAAAUIBAAAAAQELAAAQADABCwAAEAAwAwQAAFUAIDEBAE0AIUIBAE0AIQIAAAABACALAAATACACMQEATQAhQgEATQAhAgAAAAkAIAsAABUAIAIAAAAJACALAAAVACADAAAAAQAgEgAADgAgEwAAEwAgAQAAAAEAIAEAAAAJACADBQAAUgAgGAAAVAAgGQAAUwAgBS4AAEAAMC8AABwAEDAAAEAAMDEBADYAIUIBADYAIQMAAAAJACABAAAbADAXAAAcACADAAAACQAgAQAACgAwAgAAAQAgAQAAAAUAIAEAAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACAHAwAAUQAgMQEAAAABMgEAAAABMxAAAAABNEAAAAABNUAAAAABNgEAAAABAQsAACQAIAYxAQAAAAEyAQAAAAEzEAAAAAE0QAAAAAE1QAAAAAE2AQAAAAEBCwAAJgAwAQsAACYAMAcDAABQACAxAQBNACEyAQBNACEzEABOACE0QABPACE1QABPACE2AQBNACECAAAABQAgCwAAKQAgBjEBAE0AITIBAE0AITMQAE4AITRAAE8AITVAAE8AITYBAE0AIQIAAAADACALAAArACACAAAAAwAgCwAAKwAgAwAAAAUAIBIAACQAIBMAACkAIAEAAAAFACABAAAAAwAgBQUAAEgAIBgAAEsAIBkAAEoAICoAAEkAICsAAEwAIAkuAAA1ADAvAAAyABAwAAA1ADAxAQA2ACEyAQA2ACEzEAA3ACE0QAA4ACE1QAA4ACE2AQA2ACEDAAAAAwAgAQAAMQAwFwAAMgAgAwAAAAMAIAEAAAQAMAIAAAUAIAkuAAA1ADAvAAAyABAwAAA1ADAxAQA2ACEyAQA2ACEzEAA3ACE0QAA4ACE1QAA4ACE2AQA2ACEOBQAAOgAgGAAAPwAgGQAAPwAgNwEAAAABOAEAAAAEOQEAAAAEOgEAAAABOwEAAAABPAEAAAABPQEAAAABPgEAPgAhPwEAAAABQAEAAAABQQEAAAABDQUAADoAIBgAAD0AIBkAAD0AICoAAD0AICsAAD0AIDcQAAAAATgQAAAABDkQAAAABDoQAAAAATsQAAAAATwQAAAAAT0QAAAAAT4QADwAIQsFAAA6ACAYAAA7ACAZAAA7ACA3QAAAAAE4QAAAAAQ5QAAAAAQ6QAAAAAE7QAAAAAE8QAAAAAE9QAAAAAE-QAA5ACELBQAAOgAgGAAAOwAgGQAAOwAgN0AAAAABOEAAAAAEOUAAAAAEOkAAAAABO0AAAAABPEAAAAABPUAAAAABPkAAOQAhCDcCAAAAATgCAAAABDkCAAAABDoCAAAAATsCAAAAATwCAAAAAT0CAAAAAT4CADoAIQg3QAAAAAE4QAAAAAQ5QAAAAAQ6QAAAAAE7QAAAAAE8QAAAAAE9QAAAAAE-QAA7ACENBQAAOgAgGAAAPQAgGQAAPQAgKgAAPQAgKwAAPQAgNxAAAAABOBAAAAAEORAAAAAEOhAAAAABOxAAAAABPBAAAAABPRAAAAABPhAAPAAhCDcQAAAAATgQAAAABDkQAAAABDoQAAAAATsQAAAAATwQAAAAAT0QAAAAAT4QAD0AIQ4FAAA6ACAYAAA_ACAZAAA_ACA3AQAAAAE4AQAAAAQ5AQAAAAQ6AQAAAAE7AQAAAAE8AQAAAAE9AQAAAAE-AQA-ACE_AQAAAAFAAQAAAAFBAQAAAAELNwEAAAABOAEAAAAEOQEAAAAEOgEAAAABOwEAAAABPAEAAAABPQEAAAABPgEAPwAhPwEAAAABQAEAAAABQQEAAAABBS4AAEAAMC8AABwAEDAAAEAAMDEBADYAIUIBADYAIQYEAABDACAuAABBADAvAAAJABAwAABBADAxAQBCACFCAQBCACELNwEAAAABOAEAAAAEOQEAAAAEOgEAAAABOwEAAAABPAEAAAABPQEAAAABPgEAPwAhPwEAAAABQAEAAAABQQEAAAABA0MAAAMAIEQAAAMAIEUAAAMAIAoDAABHACAuAABEADAvAAADABAwAABEADAxAQBCACEyAQBCACEzEABFACE0QABGACE1QABGACE2AQBCACEINxAAAAABOBAAAAAEORAAAAAEOhAAAAABOxAAAAABPBAAAAABPRAAAAABPhAAPQAhCDdAAAAAAThAAAAABDlAAAAABDpAAAAAATtAAAAAATxAAAAAAT1AAAAAAT5AADsAIQgEAABDACAuAABBADAvAAAJABAwAABBADAxAQBCACFCAQBCACFGAAAJACBHAAAJACAAAAAAAAFLAQAAAAEFSxAAAAABURAAAAABUhAAAAABUxAAAAABVBAAAAABAUtAAAAAAQUSAABmACATAABpACBIAABnACBJAABoACBOAAABACADEgAAZgAgSAAAZwAgTgAAAQAgAAAACxIAAFYAMBMAAFsAMEgAAFcAMEkAAFgAMEoAAFkAIEsAAFoAMEwAAFoAME0AAFoAME4AAFoAME8AAFwAMFAAAF0AMAUxAQAAAAEyAQAAAAEzEAAAAAE0QAAAAAE1QAAAAAECAAAABQAgEgAAYQAgAwAAAAUAIBIAAGEAIBMAAGAAIAELAABlADAKAwAARwAgLgAARAAwLwAAAwAQMAAARAAwMQEAAAABMgEAQgAhMxAARQAhNEAARgAhNUAARgAhNgEAQgAhAgAAAAUAIAsAAGAAIAIAAABeACALAABfACAJLgAAXQAwLwAAXgAQMAAAXQAwMQEAQgAhMgEAQgAhMxAARQAhNEAARgAhNUAARgAhNgEAQgAhCS4AAF0AMC8AAF4AEDAAAF0AMDEBAEIAITIBAEIAITMQAEUAITRAAEYAITVAAEYAITYBAEIAIQUxAQBNACEyAQBNACEzEABOACE0QABPACE1QABPACEFMQEATQAhMgEATQAhMxAATgAhNEAATwAhNUAATwAhBTEBAAAAATIBAAAAATMQAAAAATRAAAAAATVAAAAAAQQSAABWADBIAABXADBKAABZACBOAABaADAAAQQAAGMAIAUxAQAAAAEyAQAAAAEzEAAAAAE0QAAAAAE1QAAAAAECMQEAAAABQgEAAAABAgAAAAEAIBIAAGYAIAMAAAAJACASAABmACATAABqACAEAAAACQAgCwAAagAgMQEATQAhQgEATQAhAjEBAE0AIUIBAE0AIQIEBgIFAAMBAwABAQQHAAAAAAMFAAgYAAkZAAoAAAADBQAIGAAJGQAKAQMAAQEDAAEFBQAPGAASGQATKgAQKwARAAAAAAAFBQAPGAASGQATKgAQKwARBgIBBwgBCAsBCQwBCg0BDA8BDREEDhIFDxQBEBYEERcGFBgBFRkBFhoEGh0HGx4LHB8CHSACHiECHyICICMCISUCIicEIygMJCoCJSwEJi0NJy4CKC8CKTAELDMOLTQU"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map