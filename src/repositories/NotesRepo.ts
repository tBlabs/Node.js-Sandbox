import { injectable } from 'inversify';
import 'reflect-metadata';
import { NoteEntity } from "../entities/NoteEntity";
import { Database } from "../database/Database";
import { Collection, Cursor } from "@types/mongodb";
import { guid } from "../types";
import { INotesRepo } from "./INotesRepo";

@injectable()
export class NotesRepo implements INotesRepo
{
    private collectionName = 'notes';

    constructor(private _db: Database) { }

    public async Add(note: NoteEntity): Promise<any>
    {
        let collection = await this._db.Open(this.collectionName);
           
        await collection.insertOne(note);
        
        this._db.Close();
    }

    public async GetChildren(parentId: guid, userId: guid): Promise<any>
    {
        let collection = await this._db.Open(this.collectionName);

        let cursor: Cursor<any> = collection.find({ parentId: parentId, userId: userId }, { _id: 0, id: 1, title: 1, content: 1 });

        let res = cursor.toArray();

        this._db.Close();

        return res;
    }
}