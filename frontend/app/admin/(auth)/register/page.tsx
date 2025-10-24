import RegisterOnboardingForm from "@/app/components/forms/auth/RegisterOnboardingForm";

export default function LoginPage() {
  return (
    <>
      <h2 className="mb-6 text-2xl">Register your Restaurant on MealFlowz</h2>
      <p className="text-gray-400">
        Your account will be manually verified by one of our customer success
        representatives.
      </p>
      <div className="w-full space-y-4">
        <hr />
        <RegisterOnboardingForm />
      </div>
    </>
  );
}
