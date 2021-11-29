import path from 'path';
import fs from 'fs';

type jsonFormat = {
    [key:string]:string
}

const getEnv = (key: string) => {
  const envPath = path.join(__dirname, '../../env.json');
  try {
    let jsonData:jsonFormat = fs.readFileSync(envPath, 'utf-8') as unknown as jsonFormat;
    jsonData = JSON.parse(jsonData as unknown as string);
    if (jsonData[key]) {
      return jsonData[key];
    }
    throw new Error(`not ${key} in env.json`);
  } catch (e) {
    try {
      if (process.env[key]) {
        return process.env[key];
      }
      throw new Error(`${key} não encontrada`);
    } catch {
      throw new Error(`${key} não encontrada`);
    }
  }
};

export default getEnv;
