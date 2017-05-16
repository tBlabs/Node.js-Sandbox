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

    public GetChildren(parentId: guid, userId: guid): Promise<any>
    {
        return new Promise((resolve, reject) => 
        {
            this._db.Open(this.collectionName).then((collection) =>
            {
              //  console.log(collection);
                console.log(parentId);
                
               let c = collection.find({ parentId: parentId, userId: userId }, { _id: 0, id: 1, title: 1, content: 1 });
           //     let c:Cursor<any> = collection.find({ parentId: "00000002-0000-0000-0000-000000000000" });
           //   console.log("C: "+JSON.stringify(c));
        //    c.forEach((e)=>{
        //       console.log("- "+e);
        //    });
              
               // c.rewind();
            //  c.toArray().then(x=>console.log(x));
            //  c.rewind();
               let res = c.toArray(); 
           //    res.then(x => console.log("V: "+x));
                  this._db.Close(); 
                return resolve(res);
                
            });
           // .catch((e)=>console.log(e));
        });
    }
}