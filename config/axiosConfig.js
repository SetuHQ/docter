import axios from "axios";
import { appConfig } from "./appConfig";
/* ///////////////////////////////////////////////// */
/* INSTANCE SETUPS ///////////////////////////////// */
/* ///////////////////////////////////////////////// */

const DefaultAxiosInstance = axios.create({
    baseURL: `${appConfig.baseUrls}/api`,
});
const GenericAxiosInstance = axios.create();

export { DefaultAxiosInstance, GenericAxiosInstance };
