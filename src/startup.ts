import { Database } from './database/Database';
import { Auth } from './services/auth';
import { HandlerException } from './framework/HandlerException';
import { IHttpStatusCode } from './framework/IHttpStatusCode';
import { Context } from './framework/Context';
import { Cqrs } from "./cqrs/cqrs";
import './handlers'; // This import is required because of necessity of call AssignMessage for every handler class
//import { Host } from "./services/host";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { container } from "./inversify.config";
import { User } from "./framework/User";
import { Claims } from "./framework/Claims";

async function AsyncFun(): Promise<string>
{
    if (1) throw ("err");

    return await "asdf";
}

class Startup
{
    public static async Start(): Promise<void>
    {
        console.log("*** START ***");

        // let host = new Host();
        // host.Register(RequestMethod.Get, '/api/test', TestRouteHandler);
        // host.Serve();
        if (0)
        //if (1)
        {
            let host = express();
            host.use(bodyParser.text());
            host.post('/api/cqrsbus', (req, res) =>
            {
                let context: Context = new Context();
                let authorizationHeader = req.headers['authorization'];

                if (authorizationHeader)
                {
                    let authService = container.resolve(Auth);
                    let user = authService.ExtractUserFromToken(authorizationHeader);

                    context.user = user;
                }

                Cqrs.Execute(req.body, context).then((result) =>
                {
                    console.log("Handle result:", result);

                    res.status(200).end(JSON.stringify(result));
                })
                    .catch((error) =>
                    {
                        console.log("Handle exception:", error);

                        res.status(error.statusCode).end(error.message);
                    });
            });

            host.listen(3000, () => console.log('* SERVER START *'));
        }
        else
        {
            try
            {
                let db = new Database();
                let collection = await db.Open('test');
                console.log(collection.namespace);
                
                await db.Close();
                console.log("Closed");
            }
            catch (e)
            {
                console.log("E: ",e);
                
            }

            //     await collection.insertMany([{ foo: "bar" }, { foo: "baz" }]);
            //     console.log("collected..");

            //     let cursor: Cursor<any> = await collection.find();
            //     let asArray = await cursor.toArray();
            //    console.log("arrayed..");

            //     expect(asArray.length).toBe(2);
            //     expect(asArray[0].foo).toBe("bar");
            //     expect(asArray[1].foo).toBe("baz");
            //     console.log("Closing..");
            //     if (db===null)console.log("NULLLLLLL");

            
            //let packageAsString = '{ "UserRegisterQuery": { "email": "u3", "password": "pass" } }';
            //  let packageAsString = '{ "LoginQuery": { "email": "u3", "password": "pass" } }';
            let packageAsString = '{ "AddNoteCommand": { "id": "12345678-1234-1234-1234-123456789012", "parentId": "00000002-0000-0000-0000-000000000000", "title": "note title", "content": "tab content" } }';
            //   let packageAsString = '{ "GetNotesQuery": { "parentId": "00000001-0000-0000-0000-000000000000" } }';

            //   let repo = container.resolve(NotesRepo);
            //   let notes = repo.GetChildren("00000001-0000-0000-0000-000000000000").then((r)=>console.log("XXXX :"+JSON.stringify(r)));
            //  console.log("_________ "+notes);


            let context: Context = new Context();
            context.user.claims.canReadNote = true;
            context.user.claims.canAddNote = true;

            try
            {
                let result = await Cqrs.Execute(packageAsString, context);
                // let result = await AsyncFun(); 
                console.log(result);
            }
            catch (error)
            {
                console.log(error);

            }

            // .then((result) => console.log("Handle result:", result))
            // .catch((err) => 
            // {
            //     console.log("Handle error:", err)
            //     if (err instanceof HandlerException)
            //     {
            //         console.log("HANDLER EXCEPTION");
            //     }
            // });
        }
    }
}

Startup.Start();