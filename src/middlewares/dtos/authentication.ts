import { RequestHandler } from "express";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { sanitize, Trim } from "class-sanitizer";
import { BadRequest } from "../../utils/customErrors";

const dtoAuthMiddleware = (
  type: any,
  skipMissingProperties = false
): RequestHandler => {
  return (req, res, next) => {
    const dtoObj = plainToInstance(type, req.body);
    validate(dtoObj, { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const dtoErrors = errors
            .map((error: ValidationError) =>
              (Object as any).values(error.constraints)
            )
            .join(", ");
          next(new BadRequest(dtoErrors));
        } else {
          //sanitize the object and call the next middleware
          sanitize(dtoObj);
          req.body = dtoObj;
          next();
        }
      }
    );
  };
};

export default dtoAuthMiddleware;
