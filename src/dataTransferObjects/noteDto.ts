import { guid } from "../types";

export class NoteDto
{
    id: guid;
    parentId: guid;
    title: string;
    content: string;
}

