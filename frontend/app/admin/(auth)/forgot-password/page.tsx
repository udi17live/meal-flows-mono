import ForgotPasswordForm from "@/app/components/forms/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <>
      <h2 className="mb-6 text-xl">
        Forgot your Password? Enter your email below. You will recieve a link to
        reset your password.
      </h2>
      <div className="w-full">
        <ForgotPasswordForm />
      </div>
    </>
  );
}
