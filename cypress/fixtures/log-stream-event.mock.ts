export const app1_prod_env_frontal_function_log_group1_stream1_events = [
  {
    timestamp: "2024-09-05T09:24:54.431Z",
    message:
      "REPORT RequestId: 24addd09-6e64-49fb-b187-94ba9b60b59a Duration: 127.10 ms Billed Duration: 154 ms Memory Size: 2048 MB Max Memory Used: 212 MB Restore Duration: 325.93 ms Billed Restore Duration: 26 ms XRAY TraceId: 1-66d978e5-56c7378e556e94b5461da07c SegmentId: 29c3839e6ecb5895 Sampled: true",
  },
  {
    timestamp: "2024-09-05T09:24:54.431Z",
    message: "END RequestId: 24addd09-6e64-49fb-b187-94ba9b60b59a",
  },
  {
    timestamp: "2024-09-05T09:24:54.418Z",
    message:
      '2024-09-05T09:24:54.417Z INFO 9 --- [ main] c.a.s.p.internal.LambdaContainerHandler : 41.74.210.180 null- null [05/09/2024:09:24:53Z] "GET /ping HTTP/1.1" 200 4 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0" combined',
  },
  {
    timestamp: "2024-09-05T09:24:54.416Z",
    message:
      "2024-09-05T09:24:54.415Z INFO 9 --- [ f-9c1bd6] .e.RequestLoggerConfigurer$RequestLogger : afterCompletion: status=200, duration=38ms",
  },
  {
    timestamp: "2024-09-05T09:24:54.416Z",
    message:
      "2024-09-05T09:24:54.416Z INFO 9 --- [ f-9c1bd6] c.example.app.concurrency.ThreadRenamer : renaming f-9c1bd6#1 thread to main",
  },
  {
    timestamp: "2024-09-05T09:24:54.384Z",
    message:
      "2024-09-05T09:24:54.384Z INFO 9 --- [ f-9c1bd6] .e.RequestLoggerConfigurer$RequestLogger : preHandle: method=GET, uri=/ping, parameters=[], handler=com.example.app.endpoint.rest.controller.health.PingController#ping(), oldThreadName=main",
  },
  {
    timestamp: "2024-09-05T09:24:54.381Z",
    message:
      "2024-09-05T09:24:54.379Z INFO 9 --- [ main] c.example.app.concurrency.ThreadRenamer : renaming main#1 thread to f-9c1bd6",
  },
  {
    timestamp: "2024-09-05T09:24:54.306Z",
    message: "START RequestId: 24addd09-6e64-49fb-b187-94ba9b60b59a Version: 1",
  },
  {
    timestamp: "2024-09-05T09:24:54.299Z",
    message: "RESTORE_REPORT Restore Duration: 325.93 ms",
  },
  {
    timestamp: "2024-09-05T09:24:53.973Z",
    message:
      "RESTORE_START Runtime Version: java:21.v20 Runtime Version ARN: arn:aws:lambda:eu-west-3::runtime:bcbf3d7f5e550d86a526a8af76998f14718a1e9f0d07f4645bba98fb4d1c97ee",
  },
];
