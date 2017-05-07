import { User, Claims } from './framework/User';
import { Context } from './framework/Context';
import { CqrsBus } from "./cqrs/cqrs";
import './handlers'; // This import is required because of necessity of call AssignMessage for every handler clas


class Startup
{
    public static Main(): void
    {
        console.log("*** APP START ***");

     

        //let packageAsString = '{ "LoginQuery": { "email": "demo", "pass": "secret" } }';
        let packageAsString = '{ "AddNoteCommand": { "id": "12345678-1234-1234-1234-123456789012", "parentId": "00000001-0000-0000-0000-000000000000", "title": "note title", "content": "tab content" } }';
        //let packageAsString = '{ "GetNotesQuery": { "parentId": "12345678-1234-1234-1234-123456789012" } }';

        let context: Context = new Context();
        context.user = new User();
        context.user.claims = new Claims();
           context.user.claims.canAddNote = true;

        CqrsBus.Execute(packageAsString, context)
            .then((result) => console.log("Handle result:", result))
            .catch((err) => console.log("Handle error:", err));
   }
}

Startup.Main();