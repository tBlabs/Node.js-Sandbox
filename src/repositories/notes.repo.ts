import { injectable } from 'inversify';
import 'reflect-metadata';
import { NoteEntity } from "../entities/NoteEntity";
import { Database } from "../database/Database";
import { Collection } from "@types/mongodb";
import { guid } from "../types";

@injectable()
export class NotesRepo
{
    private collectionName = 'notes';

    constructor(private _db: Database) { }
    
    public Add(note: NoteEntity): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {         
            this._db.Open(this.collectionName).then((collection) =>
            {
                collection.insertOne(note).then(() =>
                {
                    console.log("inserted");
                
                    this._db.Close();

                    resolve();
                })          
            });
        });
    }

    public GetAllChildren(parentId: guid): Promise<any>
    {
        return new Promise((resolve, reject) => 
        {
            this._db.Open(this.collectionName).then((collection) =>
            {
                let c = collection.find({ parentId: null });
             //   c.forEach(i=>console.log(i));
             resolve(c.toArray());
            })
        });
    }
}