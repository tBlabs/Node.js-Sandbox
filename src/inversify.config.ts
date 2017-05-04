import { IMessageHandler } from './cqrs/IQuery.interface';
import { Container } from 'inversify';
import { A } from "./services/a.class";
import { B } from "./services/b.class";

const container = new Container();

container.bind<A>(A).toSelf();
container.bind<B>(B).toSelf();

export { container };