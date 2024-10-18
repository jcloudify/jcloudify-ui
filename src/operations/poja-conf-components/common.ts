import {OneOfPojaConf} from "@jcloudify-api/typescript-client";

export const is_with_gen_api_client = (conf: OneOfPojaConf) =>
  !!(
    conf.gen_api_client?.ts_client_default_openapi_server_url ||
    conf.gen_api_client?.ts_client_api_url_env_var_name
  );
