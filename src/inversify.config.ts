import { INotesRepo } from './repositories/INotesRepo';
import { IMessageHandler } from './cqrs/IQuery.interface';
import { Container } from 'inversify';
import { Database } from "./database/Database";
import { Auth } from "./services/auth";
import { NotesRepo } from "./repositories/NotesRepo";


const container = new Container();

container.bind<Database>(Database).toSelf();
container.bind<INotesRepo>("INotesRepo").to(NotesRepo);
container.bind<Auth>(Auth).toSelf();


export { container };