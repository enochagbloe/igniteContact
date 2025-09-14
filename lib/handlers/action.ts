import { ZodError, ZodSchema } from "zod";
import { UnauthorizedError, ValidationError } from "../http.error";
import { Session } from "next-auth";
import { auth } from "@/auth";

type ActionOptions<T> = {
  schema?: ZodSchema<T>;
  params?: T;
  authorize?: boolean;
};
export async function action<T>({
  schema,
  params,
  authorize,
}: ActionOptions<T>) {
  if (schema && params)
    try {
      schema.parse(schema);
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>
        );
      } else {
        return new Error("An unexpected error occurred during validation");
      }
    }
  let session: Session | null = null;

  if (authorize) {
    session = await auth();
  }
  if (authorize && !session) {
    return new UnauthorizedError(
      "You must be logged in to perform this action"
    );
  }
}
export default action;