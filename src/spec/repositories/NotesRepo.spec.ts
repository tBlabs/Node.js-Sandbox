import { Database } from './../../database/Database';
import { NoteEntity } from './../../entities/NoteEntity';
import { NotesRepo } from './../../repositories/NotesRepo';
import { container } from "../../inversify.config";
import { DatabaseConfig } from "../../database/DatabaseConfig";
import { injectable } from 'inversify';
import 'reflect-metadata';
import { guid } from "../../types";

@injectable()
class TestDatabaseConfig implements IDatabaseConfig
{
    connectionString: string = 'mongodb://localhost:27017/test';
}

function BuildNote(id: guid, parentId: guid): NoteEntity
{
    let noteEntity: NoteEntity = new NoteEntity();

    noteEntity.id = id;
    noteEntity.parentId = parentId;
    noteEntity.userId = "00000000-afaf-0000-0000-000000000000";
    noteEntity.title = "title";
    noteEntity.content = "content";

    return noteEntity;
}

describe('NotesRepo', () =>
{
    let notesRepo: NotesRepo = null;

    beforeEach(() =>
    {
        // Switch to 'test' database
        container.unbind("IDatabaseConfig");
        container.bind<IDatabaseConfig>("IDatabaseConfig").to(TestDatabaseConfig);

        let db = container.resolve(Database);
        db.Clean('notes');

        notesRepo = new NotesRepo(db);
    });

    it('should delete', async (done) =>
    {
        let noteEntity: NoteEntity = BuildNote("00000000-0000-0000-0000-000000000001", "00000000-0000-0000-0000-000000000000");
        await notesRepo.Add(noteEntity);
        noteEntity = BuildNote("00000000-0000-0000-0000-000000000002", "00000000-0000-0000-0000-000000000000");
        await notesRepo.Add(noteEntity);
        noteEntity = BuildNote("00000000-0000-0000-0000-000000000003", "00000000-0000-0000-0000-000000000000");
        await notesRepo.Add(noteEntity);
        noteEntity = BuildNote("00000000-0000-0000-0000-000000000004", "00000000-0000-0000-0000-000000000003");
        await notesRepo.Add(noteEntity);
        noteEntity = BuildNote("00000000-0000-0000-0000-000000000005", "00000000-0000-0000-0000-000000000004");
        await notesRepo.Add(noteEntity);
        noteEntity = BuildNote("00000000-0000-0000-0000-000000000006", "00000000-0000-0000-0000-000000000004");
        await notesRepo.Add(noteEntity);

        await notesRepo.Delete("00000000-0000-0000-0000-000000000000", "00000000-afaf-0000-0000-000000000000");

        let notes: NoteEntity[] = await notesRepo.GetChildren(noteEntity.parentId, noteEntity.userId);

        expect(notes.length).toBe(0);

        done();
    });
});