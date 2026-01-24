import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ReactNode } from "react";

interface AuthCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function AuthCard({ icon, title, description }: AuthCardProps) {
  return (
    <CardHeader className="space-y-1 pb-6">
      <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <CardTitle className="text-2xl font-bold text-indigo-900 text-center">
        {title}
      </CardTitle>
      <CardDescription className="text-center text-gray-600">
        {description}
      </CardDescription>
    </CardHeader>
  );
}
