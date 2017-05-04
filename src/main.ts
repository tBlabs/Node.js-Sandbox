import { CqrsBus, AssignMessage } from "./cqrs/cqrs";
import  './handlers'; // This import is required because of necessity of call AssignMessage for every handler class

class Startup
{
    public static Main(): void
    {
        console.log("*** APP START ***");

        let packageAsString = '{ "LoginQuery": { "email": "demo", "pass": "secret" } }';
        //let packageAsString = '{ "AddNoteCommand": { "id": "12345678-1234-1234-1234-123456789012", "title": "note title" } }';
               
        try
        {
            let result = CqrsBus.Execute(packageAsString);
            console.log("Handler returned:", result);
        }
        catch (err)
        {
            console.log("CATCHED ERR: "+err);         
        }
    }
}

Startup.Main();