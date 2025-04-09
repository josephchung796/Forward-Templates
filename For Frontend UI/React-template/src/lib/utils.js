import { USERWEBAPP_FRONTEND_URL, CONTRACT_EXECUTE_URL } from "./constants";

export const fetchAppData = async (subdomain) => {
  const response = await fetch(USERWEBAPP_FRONTEND_URL + subdomain);
  if (!response.ok) throw new Error("Failed to fetch app data");
  return await response.json();
};

export const executeContractFunction = async (appId, functionName) => {
  const response = await fetch(CONTRACT_EXECUTE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      application_uuid: appId,
      function_name: functionName,
      parsed_params: [],
    }),
  });
  if (!response.ok) throw new Error("Failed to execute contract function");
  return await response.json();
};
