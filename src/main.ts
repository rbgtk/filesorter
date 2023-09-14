import fs from 'fs'
import LineReader from 'n-readlines'

const linereader = new LineReader('checksums_backup')

let checksum_line:  Buffer | boolean
let checksum_file:  Map<string, string> = new Map()
let checksum_count: Map<string, number> = new Map()

while (checksum_line = linereader.next()) {
  let split = checksum_line.toString('utf8').split(/ (.*)/s)
  
  let checksum = split[0]
  let file = split[1].trim()
  let count = checksum_count.get(checksum) ?? 0;

  checksum_file.set(checksum, file)
  checksum_count.set(checksum, count + 1)
}

let files_to_remove = fs.createWriteStream('duplicates')

checksum_count.forEach((count: number, key: string) => {
  if (count > 1) {
    files_to_remove.write(`${checksum_file.get(key)}\n`)
  }
})

files_to_remove.end()
