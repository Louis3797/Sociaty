declare namespace NodeJS {
    export interface ProcessEnv {
      SECRET: string;

      GITHUB_ID: string;
      GITHUB_SECRET: string;

      GOOGLE_ID: string;
      GOOGLE_SECRET: string

      DATSBASE_URL: string
      
    }
  }