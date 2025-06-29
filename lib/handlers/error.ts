import { NextResponse } from "next/server";
import { RequestError, ValidationError } from "../http.error";
import { ZodError } from "zod";
import logger from "../logger";

// set a new Type
export type ResponseType = "api" | "server";

// define a function
const formatResponse = (
  // define the parameters
  responseType: ResponseType,
  status: number,
  message: string,
  errors: Record<string, string[]> | undefined
) => {
  // for how the responds should look like
  const responseContent = {
    success: false,
    errors: {
      message,
      details: errors,
    },
  };
  return responseType === "api"
    ? NextResponse.json(responseContent, { status })
    : { status, ...responseContent };
};
// Now create the main handle Error function
const handleError = (error: unknown, responseType: ResponseType = "server") => {
  // check if the error is an instance of RequestError
  if (error instanceof RequestError) {
    // Insert the logger error
    logger.error({ err: error }, `Error: ${error.message}`);
    // get the status code from the RequestError
    return formatResponse(
      responseType,
      error.statusCode,
      error.message,
      error.errors
    );
  }
  // if the error is an instance of ZodError
  if (error instanceof ZodError) {
    // ZodError is validationError
    // form the validation error
    const validationError = new ValidationError(
      error.flatten().fieldErrors as Record<string, string[]>
    );
    // Insert the logger error
    logger.error({ err: error }, `${validationError.message}`);
    // return the formatResponse with everything it needs
    return formatResponse(
      responseType,
      validationError.statusCode,
      validationError.message,
      validationError.errors
    );
  }
  // if the error is an instance of any Error
  if (error instanceof Error) {
    // add the logger
    logger.error({ err: error }, `Error: ${error.message}`);
    return formatResponse(responseType, 500, error.message, {});
  }
  // add logger here
  logger.error({ err: error }, ` ${"An unexpected error occurred"}`);
  return formatResponse(responseType, 500, "Unexpected error occurred", {});
};
export default handleError;
