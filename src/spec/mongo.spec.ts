import { Cursor } from '@types/mongodb';
import { Collection } from '@types/mongodb';
import { Database } from "../database/Database";

describe("mongodb connection", () =>
{
    let db: Database = null;

    beforeEach(async () =>
    {
        db = new Database();
        await db.Clean('test');
    });


    it('should insert', async (done) =>
    {
        let collection = await db.Open('test');

        await collection.insertMany([{ foo: "bar" }, { foo: "baz" }]);

        let cursor: Cursor<any> = await collection.find();
        let asArray = await cursor.toArray();

        expect(asArray.length).toBe(2);
        expect(asArray[0].foo).toBe("bar");
        expect(asArray[1].foo).toBe("baz");

        await db.Close();
        done();
    });
});