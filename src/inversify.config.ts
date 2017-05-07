import { IMessageHandler } from './cqrs/IQuery.interface';
import { Container } from 'inversify';
import { Database } from "./database/Database";
import { NotesRepo } from "./repositories/notes.repo";


const container = new Container();

container.bind<Database>(Database).toSelf();
container.bind<NotesRepo>(NotesRepo).toSelf();


export { container };