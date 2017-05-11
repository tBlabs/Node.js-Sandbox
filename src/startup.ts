import { HandlerException } from './framework/HandlerException';
import { IHttpStatusCode } from './framework/IHttpStatusCode';
import { User, Claims } from './framework/User';
import { Context } from './framework/Context';
import { Cqrs } from "./cqrs/cqrs";
import './handlers'; // This import is required because of necessity of call AssignMessage for every handler class
import { Host } from "./services/host";


class Startup
{
    public static Start(): void
    {
        console.log("*** START ***");

        let host = new Host();
        host.Serve();

        // let packageAsString = '{ "UserRegisterQuery": { "email": "u3", "password": "pass" } }';
        // //  let packageAsString = '{ "LoginQuery": { "email": "u3", "password": "pass" } }';
        // //  let packageAsString = '{ "AddNoteCommand": { "id": "12345678-1234-1234-1234-123456789012", "parentId": "00000002-0000-0000-0000-000000000000", "title": "note title", "content": "tab content" } }';
        // //  let packageAsString = '{ "GetNotesQuery": { "parentId": "00000002-0000-0000-0000-000000000000" } }';

        // let context: Context = new Context();
        // context.user = new User();
        // context.user.claims = new Claims();

        // Cqrs.Execute(packageAsString, context)
        //     .then((result) => console.log("Handle result:", result))
        //     .catch((err) => 
        //     {
        //         console.log("Handle error:", err)
        //         if (err instanceof HandlerException)
        //         {
        //             console.log("HANDLER EXCEPTION");
        //         }
        //     });
    }
}

Startup.Start();