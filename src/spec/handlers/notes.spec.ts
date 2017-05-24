import { UnathorizedException } from './../../handlers/exceptions/UnathorizedException';
import { Context } from './../../framework/Context';
import { AddNoteCommand } from './../../messages/notes/AddNoteCommand';
import { AddNoteCommandHandler } from './../../handlers/notes/AddNoteCommandHandler';
import { NoteEntity } from "../../entities/NoteEntity";
import { guid } from "../../types";
import { INotesRepo } from "../../repositories/INotesRepo";
import { HandlerException } from "../../framework/HandlerException";
import { NotesRepoMock } from "./NotesRepo.mock";


describe("Notes handlers", () =>
{
    let notesRepo: INotesRepo = null;
    let addNoteCommandHandler: AddNoteCommandHandler = null;
    let addNoteCommand: AddNoteCommand = null;
    let context: Context = null;

    beforeEach(() =>
    {
        notesRepo = new NotesRepoMock();
        addNoteCommandHandler = new AddNoteCommandHandler(notesRepo);
        addNoteCommand = new AddNoteCommand();
        addNoteCommand.id = "00000000-1111-2222-3333-000000000000";
        addNoteCommand.parentId = "10000000-1111-2222-3333-000000000000";
        addNoteCommand.title = "note title";
        context = new Context();
    });

    it("should add note", async (done) =>
    {
        context.user.claims.canAddNote = true;

        try
        {
            let result = await addNoteCommandHandler.Handle(addNoteCommand, context);
          
            expect(result).toBe(void 0);
        }
        catch (e)
        {
            expect(true).toBeFalsy("Should never get here!!!");
        }
       
        done();
    });

    it("should throw unathorized exception", async (done) =>
    {
        context.user.claims.canAddNote = false;

        try
        {
            let result = await addNoteCommandHandler.Handle(addNoteCommand, context);
            expect(true).toBeFalsy('Should never get here!!!');
        }
        catch (e)
        {
            expect(e.message).toBe(new UnathorizedException().message);
        }

        done();
    });
});