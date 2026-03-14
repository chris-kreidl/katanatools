interface McpErrorResponse {
  [key: string]: unknown;
  content: [{ type: "text"; text: string }];
  isError: true;
}

interface FetchErrorLike {
  statusCode?: number;
  message?: string;
  data?: unknown;
}

function isFetchError(error: unknown): error is FetchErrorLike {
  return error !== null && typeof error === "object" && "statusCode" in error;
}

export function formatMcpError(context: string, error: unknown): McpErrorResponse {
  let errorText = `Error ${context}`;

  if (isFetchError(error)) {
    const parts: string[] = [];

    if (error.statusCode) {
      parts.push(`Status: ${error.statusCode}`);
    }

    if (error.message) {
      parts.push(`Message: ${error.message}`);
    }

    if (error.data) {
      const dataStr =
        typeof error.data === "string" ? error.data : JSON.stringify(error.data, null, 2);
      parts.push(`Response: ${dataStr}`);
    }

    errorText = parts.length > 0 ? `${errorText}\n${parts.join("\n")}` : errorText;
  } else if (error instanceof Error) {
    errorText = `${errorText}: ${error.message}`;
  } else {
    errorText = `${errorText}: ${String(error)}`;
  }

  return {
    content: [{ type: "text", text: errorText }],
    isError: true,
  };
}
