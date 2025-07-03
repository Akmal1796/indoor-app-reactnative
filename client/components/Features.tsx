import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Shield,
  Users,
  BarChart3,
  Puzzle,
  Smartphone,
  Globe,
  Clock,
  Heart,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built for speed with optimized performance and instant loading times.",
    badge: "Performance",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade security with end-to-end encryption and compliance.",
    badge: "Security",
    gradient: "from-blue-400 to-purple-500",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Real-time collaboration tools that keep your team in sync.",
    badge: "Collaboration",
    gradient: "from-green-400 to-blue-500",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Deep insights and reporting to make data-driven decisions.",
    badge: "Analytics",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    icon: Puzzle,
    title: "Easy Integration",
    description: "Connect with your favorite tools through our robust API.",
    badge: "Integration",
    gradient: "from-teal-400 to-cyan-500",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Native mobile experience across all devices and platforms.",
    badge: "Mobile",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Worldwide infrastructure with 99.9% uptime guarantee.",
    badge: "Infrastructure",
    gradient: "from-indigo-400 to-purple-500",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support whenever you need help.",
    badge: "Support",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    icon: Heart,
    title: "User Focused",
    description: "Designed with your users in mind for the best experience.",
    badge: "UX",
    gradient: "from-red-400 to-rose-500",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-muted/30 relative">
      <div className="container px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to streamline your workflow and boost
            productivity.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-background/50 backdrop-blur-sm animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-br ${feature.gradient} bg-opacity-10`}
                    >
                      <Icon
                        className={`w-6 h-6 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`}
                      />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
