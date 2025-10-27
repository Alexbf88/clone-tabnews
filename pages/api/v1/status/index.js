import  database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;
  const databaseData = await database.query("SHOW max_connections;");
  const databaseMax = parseInt(databaseData.rows[0].max_connections);

  const databaseName = process.env.POSTGRES_DB;
  const databaseAct = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseactValue = databaseAct.rows[0].count;

  console.log(databaseAct)

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: databaseMax,
        active_connections: databaseactValue, 
      }
    }
  });
}

export default status;
