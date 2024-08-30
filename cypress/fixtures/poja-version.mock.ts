export const pojaVersions = ["3.6.2"].map((version) => {
  const [major, minor, patch] = version.split(".");
  return {
    major,
    minor,
    patch,
    human_readable_value: version,
  };
});
