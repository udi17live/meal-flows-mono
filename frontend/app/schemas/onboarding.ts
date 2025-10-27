import z, { file } from "zod";

const fileSchema = z
  .instanceof(File)
  .nullable()
  .refine(
    (file) => file !== null && file instanceof File,
    "Please upload a file."
  );

export const onboardingSchema = z
  .object({
    restaurantName: z.string().min(1),
    restaurantEmail: z.email(),
    restaurantType: z.string().min(1),
    restaurantCuisine: z.string().min(1),
    managerName: z.string().min(1),
    managerEmail: z.email(),
    managerPhone: z.string().min(6),
    dataBRFile: fileSchema,
    dataIDFile: fileSchema,
    password1: z.string().min(8, "Password must be more than 8 Characters."),
    password2: z
      .string()
      .min(8, "Confirm Password must be more than 8 Characters."),
  })
  .refine((data) => data.password1 === data.password2, {
    path: ["password2"],
    message: "Passwords must match",
  });
