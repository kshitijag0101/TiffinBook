import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { readFile } from "fs/promises"

const filePath = new URL("./firebaseAccountKey.json", import.meta.url);
const serviceAccount = JSON.parse(await readFile(filePath));

const firebaseApp = initializeApp({
  credential: cert(serviceAccount)
});

const auth = getAuth(firebaseApp);

export { auth };
