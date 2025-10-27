import z, { file } from "zod";

const fileSchema = z
  .instanceof(File)
  .nullable()
  .refine(
    (file) => file !== null && file instanceof File,
    "Please upload a file."
  );

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(32, "Password must be at most 32 characters long")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character")
  .refine((value) => !/\s/.test(value), "Password must not contain spaces");

export const onboardingSchema = z
  .object({
    restaurantName: z.string().min(1),
    restaurantEmail: z.email(),
    restaurantPhone: z.string().min(7),
    restaurantType: z.string().min(1),
    restaurantCuisine: z.string().min(1),
    managerName: z.string().min(1),
    managerEmail: z.email(),
    managerPhone: z.string().min(7),
    dataBRFile: fileSchema,
    dataIDFile: fileSchema,
    password1: passwordSchema,
    password2: z
      .string()
      .min(8, "Confirm Password must be more than 8 Characters."),
  })
  .refine((data) => data.password1 === data.password2, {
    path: ["password2"],
    message: "Passwords must match",
  });
