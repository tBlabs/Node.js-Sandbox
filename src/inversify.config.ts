import { Container } from 'inversify';
import { A } from "./a.class";
import { B } from "./b.class";


var container = new Container();

container.bind<A>(A).toSelf();
container.bind<B>(B).toSelf();

export { container };