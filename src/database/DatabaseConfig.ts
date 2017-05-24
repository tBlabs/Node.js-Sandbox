import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class DatabaseConfig implements IDatabaseConfig
{
    public connectionString: string = 'mongodb://localhost:27017/sandbox';
}