import { guid } from "../../types";

export class AddNoteCommand
{
    id: guid;
    parentId: guid;
    title: string;
    content: string;
}