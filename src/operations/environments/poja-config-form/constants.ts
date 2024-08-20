import {ConcurrencyConf1, MailingConf1} from "@jcloudify-api/typescript-client";

export const NO_PUBLISH_CLIENT_CONF = {
  with_publish_to_npm_registry: false,
  aws_account_id: null,
  codeartifact_repository_name: null,
  codeartifact_domain_name: null,
};

export const NO_AURORA_CONF = {
  aurora_min_capacity: null,
  aurora_max_capacity: null,
  aurora_scale_point: null,
  aurora_sleep: null,
  aurora_auto_pause: false,
};

export const NO_MAILING_CONF = {
  ses_source: null,
};

export const MAILING_CONF: MailingConf1 = {
  ses_source: null,
};

export const NO_CONCURRENCY_CONF: ConcurrencyConf1 = {
  frontal_reserved_concurrent_executions_nb: null,
  worker_reserved_concurrent_executions_nb: null,
};
