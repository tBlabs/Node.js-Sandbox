import { guid } from "../types";

export class NoteEntity
{
    id: guid;
    parentId: guid;
    userId: guid;
    title: string;
    content: string;
}

