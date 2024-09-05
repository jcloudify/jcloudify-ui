export const parseFunctionNameParams = (functionName: string) => {
  const [label, name] = functionName.split(":");
  return {
    label,
    name,
  };
};
