export interface IConfigData {
  server: {
    port: number;
  };
  database: {
    host: string;
    port: number;
  };
}

export interface IConfig {
  config: IConfigData;
}

export default (): IConfig => ({
  config: {
    server: {
      port: parseInt(process.env.SERVER_PORT, 10) || 3000,
    },
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT) || 5432,
    },
  },
});

{
  f: 'fddf';
  ef: {
    ff: {
      fd: 'F';
    }
  }
}
