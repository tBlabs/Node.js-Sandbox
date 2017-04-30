import { A } from "./a.class";
import { B } from "./b.class";
import { container } from "./inversify.config";

class Startup
{
    public static Main(): number
    {
        console.log("Startup()");

        let a: A = container.get<A>(A);        

        return 0;
    }
}

Startup.Main();