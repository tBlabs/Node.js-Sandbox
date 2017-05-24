import { guid } from "../../types";

export class UpdateNoteCommand
{
    public id: guid;
    public parentId: guid;
    public title: string;
    public content: string;
}