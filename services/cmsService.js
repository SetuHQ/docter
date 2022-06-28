import { DefaultAxiosInstance } from "../config/axiosConfig";

const cms = async () => {
    const { data } = await DefaultAxiosInstance.get("/cms");
    return data;
};

export const cmsService = {
    cms,
};
