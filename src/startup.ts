import { Database } from './database/Database';
import { Auth } from './services/auth';
import { HandlerException } from './framework/HandlerException';
import { Context } from './framework/Context';
import { Cqrs } from "./cqrs/cqrs";
import './handlers'; // This import is required because of necessity of call AssignMessage for every handler class
//import { Host } from "./services/host";
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { container } from "./inversify.config";
import { User } from "./framework/User";
import { Claims } from "./framework/Claims";

class Startup
{
    public static async Start(): Promise<void>
    {
        console.log("*** START ***");

        Cqrs.PrintMessagesHandlers();

        // let host = new Host();
        // host.Register(RequestMethod.Get, '/api/test', TestRouteHandler);
        // host.Serve();
        //  if (0)
       if (1)
        {
            let host = express();

            host.use(bodyParser.json());
            host.use(cors());

            host.post('/api/cqrsbus', async (req, res) =>
            {        
                // TODO: Why this is not working?!?!?!
                // res.header('Access-Control-Allow-Origin', '*');
                // res.header('Access-Control-Allow-Methods', 'POST');
                // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

                let context: Context = new Context();
                let authorizationHeader = req.headers['authorization'];

                if (authorizationHeader)
                {
                    let authService = container.resolve(Auth);
                    let user = authService.ExtractUserFromToken(authorizationHeader);

                    context.user = user;
                }

                try
                {            
                    let result = await Cqrs.Execute(req.body, context);

                    console.log("Handle result:", result);

                    res.status(200).end(JSON.stringify(result));
                }
                catch (error)
                {
                    console.log("Handle exception:", error);

                    if (error instanceof HandlerException)
                    {
                        if (error.statusCode)
                        {
                            res.status(error.statusCode).end(error.message);
                        }
                    }
                }
            });

            host.listen(3000, () => console.log('* SERVER START *'));
        }
        else
        {                   
            console.log("*** TEST MODE ***");
                   
            //let packageAsString = '{ "UserRegisterQuery": { "email": "u3", "password": "pass" } }';
            // let packageAsString = '{ "LoginQuery": { "email": "tB", "password": "pass" } }';
            // let packageAsString = '{ "AddNoteCommand": { "id": "12345678-1234-1234-1234-123456789012", "parentId": "00000002-0000-0000-0000-000000000000", "title": "note title", "content": "tab content" } }';
              let packageAsString = '{ "UpdateNoteCommand": { "id": "8574c9e6-a4b9-4b4a-3165-1d2f21061df9", "parentId": "ad39954b-3ea9-2c68-244d-a58ae1eee927", "title": "new title", "content": "new content" } }';
            //   let packageAsString = '{ "GetNotesQuery": { "parentId": "00000001-0000-0000-0000-000000000000" } }';


            let context: Context = new Context();
            context.user.id = "575af61d-6ff2-40b2-8afa-b295d2a4e489";
            context.user.claims.canReadNote = true;
            context.user.claims.canAddNote = true;
            context.user.claims.canChangeNote = true;

            try
            {
                let messagePackage = JSON.parse(packageAsString);
                let result = await Cqrs.Execute(messagePackage, context);
                console.log(result);
            }
            catch (error)
            {
                console.log(error);
            }         
        }
    }
}

Startup.Start();