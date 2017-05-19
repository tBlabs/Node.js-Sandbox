import { guid } from "../types";
import { NoteEntity } from "../entities/NoteEntity";
import { NoteDto } from "../dataTransferObjects/noteDto";

export interface INotesRepo
{
    Add(note: NoteEntity): Promise<void>;
    GetChildren(parentId: guid, userId: guid): Promise<NoteDto[]>;
}
