import * as express from 'express';
import * as bodyParser from 'body-parser';

enum HttpMethod {
    Get,
    Post
}
class Route
{
    method: HttpMethod;
    url: string;
    handler: Route;
}

class Request
{
    public body: string;
    public auth: string;
}

export class RouteHandler
{
    public request: Request;
   // public Respond(statusCode, body): void;


}

export class Host
{
    private server: express.Express = null;
    private routes: Route[] = null;

    constructor() 
    { 
    
        this.server = express();

        this.Config();

        this.Routes();
     }

    private  Config()
    {
        this.server.use(bodyParser.text());
    }
    

    private  Routes()
    {
        console.log("asdf");
        
        this.server.post('/:url', (req, res) => 
        {
            console.log(req.params.url);
            
            // re.met
            // postRoutesCollection[req.params.] 

            // // console.log(JSON.stringify(req.headers['authorization']));
            // console.log(JSON.stringify(req.headers['authorization']));
            // // console.log(req.body);
            // res.send("hi! " + req.body);

            // let authToken = req.headers['authorization'];
            // let body = req.body;

            // Cqrs.Handle(auth, body)
            //     .then((handlerResult) => { })
            //     .catch((hadnlerException) => { })
        });
    }

    public  Serve()
    {
        this.server.listen(3000, () => console.log('* SERVER START *'));
    }
}