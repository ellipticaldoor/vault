import Joi from '@hapi/joi';

export const isRequired = (value: any) => Boolean(value) === true;

export const isUsername = (username: string) => {
  Joi.assert(
    username,
    Joi.string()
      .strict()
      .min(3)
      .max(30)
      .token()
      .lowercase(),
  );
};

export const isPassword = (password: string) => {
  Joi.assert(
    password,
    Joi.string()
      .strict()
      .min(8)
      .max(100),
  );
};
