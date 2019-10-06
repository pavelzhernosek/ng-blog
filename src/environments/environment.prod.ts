import { Environment } from "./interface";
import { config } from "../config";

export const environment: Environment = {
  production: true,
  apiKey: config.apiKey
};
