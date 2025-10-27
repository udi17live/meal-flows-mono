import DashboardLayout from "@/app/(dashboard)/DashboardLayout";
import React from "react";

export default function MerchantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout role="merchant">{children}</DashboardLayout>;
}
