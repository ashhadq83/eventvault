import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FeatureCards() {
  const features = [
    {
      title: "Fast Availability",
      description: "Real-time calendar, no conflicts",
      detail: "Check rooms instantly",
    },
    {
      title: "Easy Invoicing",
      description: "Deposits via Stripe",
      detail: "Auto-generated contracts",
    },
    {
      title: "Mobile Ready",
      description: "Staff & admin on the go",
      detail: "React Native coming soon",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mb-12">
      {features.map((feature, index) => (
        <Card
          key={index}
          className="border-indigo-200 shadow-lg hover:shadow-xl transition-shadow"
        >
          <CardHeader>
            <CardTitle className="text-indigo-800">{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{feature.detail}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
