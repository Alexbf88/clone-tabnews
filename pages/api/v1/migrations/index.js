import  migrationRunner from "node-pg-migrate";
import { join} from "node:path";
import database from "infra/database.js"


export default async function migrations(request, response) {
    if (request.method === 'GET'){
      const dbClient = await database.getNewClient();
      const migrations = await migrationRunner({
         dbClient: dbClient,
         dryRun: true,
         dir: join("infra/migrations"),
         direction: "up",
         verbose: true,
         migrationsTable: "pgmigrations",
      });
      await dbClient.end();
      return response.status(200).json(migrations);
  }
    
    if (request.method === 'POST'){
     const migrations = await migrationRunner({
        databaseUrl: process.env.DATABASE_URL,
        dryRun: false,
        dir: join("infra/migrations"),
        direction: "up",
        verbose: true,
        migrationsTable: "pgmigrations",
    });
  await dbClient.end();
  response.status(200).json(migrations);
  }
return response.status(405).end();
}