import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 hero-pattern" />
      <div className="absolute inset-0 bg-noise opacity-30" />

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-20 animate-float" />
      <div
        className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-accent rounded-full opacity-15 animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-secondary rounded-full opacity-25 animate-float"
        style={{ animationDelay: "4s" }}
      />

      <div className="container relative z-10 text-center px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-effect rounded-full px-4 py-2 text-sm font-medium mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Introducing the future of productivity</span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-display-xl font-bold tracking-tight mb-6 animate-fade-in-up">
          Build amazing products
          <br />
          <span className="gradient-text">faster than ever</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Our platform empowers teams to create, collaborate, and deliver
          exceptional experiences with cutting-edge tools and seamless
          workflows.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Button
            size="lg"
            className="bg-gradient-primary hover:opacity-90 transition-opacity group"
          >
            Get started free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg" className="glass-effect group">
            <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Watch demo
          </Button>
        </div>

        {/* Social proof */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <p className="text-sm text-muted-foreground mb-6">
            Trusted by 50,000+ teams worldwide
          </p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            {["Company A", "Company B", "Company C", "Company D"].map(
              (company, index) => (
                <div
                  key={company}
                  className="px-4 py-2 bg-muted rounded-md text-sm font-medium hover:opacity-100 transition-opacity cursor-pointer"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  {company}
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
