import z from "zod";

export const onboardingSchema = z
  .object({
    restaurantName: z.string().min(1),
    restaurantEmail: z.email(),
    restaurantType: z.string().min(1),
    restaurantCuisine: z.string().min(1),
    managerName: z.string().min(1),
    managerEmail: z.email(),
    managerPhone: z.string().min(6),
    dataBRFile: z.instanceof(File),
    dataIDFile: z.instanceof(File),
    password1: z.string().min(8),
    password2: z.string().min(8),
  })
  .refine((data) => data.password1 === data.password2, {
    path: ["password2"],
    message: "Passwords must match",
  });
