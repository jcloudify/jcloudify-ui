import {OneOfPojaConf} from "@jcloudify-api/typescript-client";

export const checkPojaConf = (config: OneOfPojaConf) => {
  return {
    is_with_gen_api_client: !!(
      config.gen_api_client?.ts_client_default_openapi_server_url ||
      config.gen_api_client?.ts_client_api_url_env_var_name
    ),
  };
};
