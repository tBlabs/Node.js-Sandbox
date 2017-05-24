import { UpdateNoteCommandHandler } from './../../handlers/notes/UpdateNoteCommandHandler';
import { UnathorizedException } from './../../handlers/exceptions/UnathorizedException';
import { Context } from './../../framework/Context';
import { AddNoteCommand } from './../../messages/notes/AddNoteCommand';
import { AddNoteCommandHandler } from './../../handlers/notes/AddNoteCommandHandler';
import { NoteEntity } from "../../entities/NoteEntity";
import { guid } from "../../types";
import { INotesRepo } from "../../repositories/INotesRepo";
import { HandlerException } from "../../framework/HandlerException";
import { NotesRepoMock } from "./NotesRepo.mock";
import { UpdateNoteCommand } from "../../messages/notes/UpdateNoteCommand";


describe("UpdateNoteHandler", () =>
{
    let notesRepo: INotesRepo = null;
    let updateNoteCommandHandler: UpdateNoteCommandHandler = null;
    let updateNoteCommand: UpdateNoteCommand = null;
    let context: Context = null;

    beforeEach(() =>
    {
        notesRepo = new NotesRepoMock();
        updateNoteCommandHandler = new UpdateNoteCommandHandler(notesRepo);
        updateNoteCommand = new UpdateNoteCommand();
        updateNoteCommand.id = "00000000-1111-0000-0000-000000000000";
        updateNoteCommand.parentId = "00000000-0000-0000-0000-000000000000";
        updateNoteCommand.title = "updated title";
        context = new Context(); 

        const noteEntity = new NoteEntity();
        noteEntity.id = "00000000-1111-0000-0000-000000000000";
        noteEntity.parentId = "00000000-0000-0000-0000-000000000000";
        noteEntity.userId = "00000000-0000-0000-0000-000000000000";
        noteEntity.title = "initial title";
        noteEntity.content = "initial content";

        notesRepo.Add(noteEntity);
    });

    it("should update note", async (done) =>
    {      
        context.user.claims.canChangeNote = true;

        try
        {
            let result = await updateNoteCommandHandler.Handle(updateNoteCommand, context);

            expect(result).toBe(void 0);
        }
        catch (e)
        {
            expect(true).toBeFalsy("Should never get here! Exception: "+JSON.stringify(e));
        }

        done();
    }); 
});