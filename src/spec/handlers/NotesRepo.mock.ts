import { INotesRepo } from "../../repositories/INotesRepo";
import { NoteEntity } from "../../entities/NoteEntity";
import { guid } from "../../types";

export class NotesRepoMock implements INotesRepo
{
    private notes: NoteEntity[] = [];

    public async Add(note: NoteEntity): Promise<void>
    {
        await this.notes.push(note);
    }

    public async GetChildren(parentId: guid, userId: guid): Promise<any>
    {
        await this.notes.find(n => n.parentId === parentId && n.userId === userId);
    }

    public async Update(note: NoteEntity): Promise<void>
    {

    }

    public async Delete(parentId: string, userId: string): Promise<void>
    {
  
    }
}