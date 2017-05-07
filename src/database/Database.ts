import { injectable } from 'inversify';
import 'reflect-metadata'
import { MongoClient, Collection, MongoError, Db } from 'mongodb';

@injectable()
export class Database
{
    private connectionString: string = 'mongodb://localhost:27017/sandbox';
    private _mongo: MongoClient = null;
    private _db: Db = null;

    constructor() 
    {
        this._mongo = new MongoClient();
    }

    public Open(collection): Promise<Collection>
    {
        return new Promise((resolve, reject) =>
        {
            this._mongo.connect(this.connectionString, (e: MongoError, db: Db) =>
            {
                if (e) reject(e);

                this._db = db;

                resolve(db.collection(collection));
            });
        });
    }

    public Close()
    {
        this._db.close();
        console.log("db close");
        
    }
}