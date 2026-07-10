"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
exports.default = (0, test_1.defineConfig)({
    testDir: './e2e',
    reporter: 'list',
    use: {
        baseURL: 'http://localhost:3000',
    },
});
//# sourceMappingURL=playwright.config.js.map