import { decompress } from "./decompress.js";
import fs from 'fs'
const buffer = fs.readFileSync('./test/AlibabaPuHuiTi-3-35-Thin.woff2')
const res = await decompress(new Uint8Array(buffer))
console.log(res)