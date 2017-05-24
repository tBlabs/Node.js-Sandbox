import { DatabaseConfig } from './database/DatabaseConfig';
import { INotesRepo } from './repositories/INotesRepo';
import { IMessageHandler } from './cqrs/IQuery.interface';
import { Container } from 'inversify';
import { Auth } from "./services/auth";
import { NotesRepo } from "./repositories/NotesRepo";
import { Database } from "./database/Database";


const container = new Container();

container.bind<IDatabaseConfig>("IDatabaseConfig").to(DatabaseConfig);
container.bind<Database>(Database).toSelf();
container.bind<INotesRepo>("INotesRepo").to(NotesRepo);
container.bind<Auth>(Auth).toSelf();


export { container };