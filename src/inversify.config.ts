import { IMessageHandler } from './cqrs/IQuery.interface';
import { Container } from 'inversify';
import { Database } from "./database/Database";
import { NotesRepo } from "./repositories/notes.repo";
import { Auth } from "./services/auth";


const container = new Container();

container.bind<Database>(Database).toSelf();
container.bind<NotesRepo>(NotesRepo).toSelf();
container.bind<Auth>(Auth).toSelf();


export { container };