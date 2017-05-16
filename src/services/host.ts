// import * as express from 'express';
// import * as bodyParser from 'body-parser';

// export enum RequestMethod
// {
//     Get,
//     Post
// }

// export class Route
// {
//     method: RequestMethod;
//     url: string;
//     handler: Route;
// }


// export class Host
// {
//     private server: express.Express = null;
//     private routes: Route[] = null;

//     constructor() 
//     {     
//         this.server = express();

//         this.Config();

//         this.server.all('/:url', (req, res) => 
//         {
//             console.log(req.params.url);
//             console.log(req.method);

//             // re.met
//             // postRoutesCollection[req.params.] 

//             // // console.log(JSON.stringify(req.headers['authorization']));
//             // console.log(JSON.stringify(req.headers['authorization']));
//             // // console.log(req.body);
//             // res.send("hi! " + req.body);

//             // let authToken = req.headers['authorization'];
//             // let body = req.body;

//             // Cqrs.Handle(auth, body)
//             //     .then((handlerResult) => { })
//             //     .catch((hadnlerException) => { })
//         });
//      }

//     private  Config()
//     {
//         this.server.use(bodyParser.text());
//     }

//     public Register(requestType: RequestMethod, url: string, handler: any)
//     {
//         let route = new Route();
//         route.method = requestType;
//         route.url = url;
//         route.handler = handler;

//         this.routes.push(route);
//     }
 
//     public  Serve()
//     {

//         this.server.listen(3000, () => console.log('* SERVER START *'));
//     }
// }