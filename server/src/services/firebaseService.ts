import * as admin from "firebase-admin";
import config from "../config";

export class FirebaseService {
  private static _instance: FirebaseService;
  public db: admin.database.Database;

  constructor() {
    const serviceAccount = require("../../serviceAccountKey.json");

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: config.databaseURL,
    });

    this.db = admin.database();
  }

  static get instance() {
    return this._instance || (this._instance = new this());
  }

  async create(path: string, data: any) {
    const ref = this.db.ref(path);
    const newRef = ref.push();
    await newRef.set(data);
    const snapshot = await newRef.once("value");

    return { id: snapshot.key!, ...data };
  }

  async read(path: string) {
    const snapshot = await this.db.ref(path).once("value");

    return { id: snapshot.key!, ...snapshot.val() };
  }

  async update(path: string, data: any) {
    const id = (data as any).id;
    if (!id) throw new Error("Missing ID");
    await this.db.ref(`${path}/${id}`).update(data);

    return data;
  }

  async delete(path: string, id: string) {
    await this.db.ref(`${path}/${id}`).remove();
    return id;
  }
}
