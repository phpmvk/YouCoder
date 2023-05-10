import { readFileSync, writeFileSync } from 'fs';
import { Buffer } from 'buffer';

const HEADER_MAGIC = Buffer.from('AJC1');

function readAjcFile(file_path: string): {
  audioData: Buffer;
  jsonData: Buffer;
} {
  const fileData = readFileSync(file_path);
  const header = fileData.slice(0, 4);

  if (!header.equals(HEADER_MAGIC)) {
    throw new Error('Invalid file format');
  }

  const audioDataLength = fileData.readUInt32BE(4);
  const audioData = fileData.slice(8, 8 + audioDataLength);

  const jsonDataLength = fileData.readUInt32BE(8 + audioDataLength);
  const jsonData = fileData.slice(8 + audioDataLength + 4);

  return { audioData, jsonData };
}

function writeAjcFile(
  audioFilePath: string,
  jsonFilePath: string,
  outputFilePath: string
): void {
  const audioData = readFileSync(audioFilePath);
  const jsonData = readFileSync(jsonFilePath);

  const audioDataLength = Buffer.alloc(4);
  audioDataLength.writeUInt32BE(audioData.length, 0);

  const jsonDataLength = Buffer.alloc(4);
  jsonDataLength.writeUInt32BE(jsonData.length, 0);

  const outputFileData = Buffer.concat([
    HEADER_MAGIC,
    audioDataLength,
    audioData,
    jsonDataLength,
    jsonData,
  ]);
  writeFileSync(outputFilePath, outputFileData);
}

/*
Example usage:
writeAjcFile('audio.wav', 'instructions.json', 'combined.ycr');
const { audioData, jsonData } = readAjcFile('combined.ycr');
*/
