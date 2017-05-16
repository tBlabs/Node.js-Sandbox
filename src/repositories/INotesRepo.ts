import { NoteEntity } from "../entities/NoteEntity";
import { guid } from "../types";
import { NoteDto } from "../dataTransferObjects/noteDto";

export interface INotesRepo
{
    Add(note: NoteEntity): Promise<null>;
    GetChildren(parentId: guid, userId: guid): Promise<NoteDto[]>;
}
