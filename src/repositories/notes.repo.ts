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
                    this._db.Close();

                    return resolve();
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
                let c = collection.find({ parentId: parentId }, { _id: 0, id: 1, title: 1, content: 1 });
          
                return resolve(c.toArray());
            })
        });
    }
}