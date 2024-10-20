import { ofetch } from "ofetch";
import { endpoints } from "../../../config";

const url = endpoints.tech;

const list = async () => {
  try {
    const tech = await ofetch(url);
    return tech?.data ?? [];
  } catch (error) {
    console.error(error);
  }
};

export default { list };
