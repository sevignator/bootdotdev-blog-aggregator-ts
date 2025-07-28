import { setUser, readConfig } from "./config";

async function main() {
  await setUser('Mik');
  console.log(await readConfig());
}

main();

