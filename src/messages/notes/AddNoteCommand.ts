import { guid } from "../../types";

export class AddNoteCommand
{
    public id: guid;
    public parentId: guid;
    public title: string;
    public content: string;
}