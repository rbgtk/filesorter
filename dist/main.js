"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const n_readlines_1 = __importDefault(require("n-readlines"));
const linereader = new n_readlines_1.default('checksums_backup');
let checksum_line;
let checksum_file = new Map();
let checksum_count = new Map();
while (checksum_line = linereader.next()) {
    let split = checksum_line.toString('utf8').split(/ (.*)/s);
    let checksum = split[0];
    let file = split[1].trim();
    let count = (_a = checksum_count.get(checksum)) !== null && _a !== void 0 ? _a : 0;
    checksum_file.set(checksum, file);
    checksum_count.set(checksum, count + 1);
}
let files_to_remove = fs_1.default.createWriteStream('duplicates');
checksum_count.forEach((count, key) => {
    if (count > 1) {
        files_to_remove.write(`${checksum_file.get(key)}\n`);
    }
});
files_to_remove.end();
