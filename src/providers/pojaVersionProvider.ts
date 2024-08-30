import {PojaVersion} from "@jcloudify-api/typescript-client";
import {pojaVersionApi, unwrap} from "@/services/poja-api";
import {PagedResponse, PojaDataProvider, ToRecord} from "@/providers";

export const pojaVersionProvider: PojaDataProvider<ToRecord<PojaVersion>> = {
  async getList() {
    const versionsResponse = (await unwrap(() =>
      pojaVersionApi().getPojaVersions()
    )) as PagedResponse<ToRecord<PojaVersion>>;
    return {
      ...versionsResponse,
      data: versionsResponse.data.map((version) => ({
        ...version,
        id: version.human_readable_value!,
      })),
    };
  },
  getOne() {
    throw new Error("Function not implemented.");
  },
  save() {
    throw new Error("Function not implemented.");
  },
  saveAll() {
    throw new Error("Function not implemented.");
  },
  delete() {
    throw new Error("Function not implemented.");
  },
};
