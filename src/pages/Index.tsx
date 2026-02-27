import { Cloud, Network } from "lucide-react";
import FeatureGrid from "@/components/FeatureGrid";
import IpDetector from "@/components/IpDetector";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex items-center gap-2 py-4">
          <Cloud className="h-6 w-6 text-primary" />
          <span className="font-semibold text-foreground">CloudStack</span>
        </div>
      </header>

      <main className="container max-w-3xl py-16 space-y-14">
        {/* Hero */}
        <section className="text-center space-y-4 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-accent px-4 py-1.5 text-sm text-accent-foreground">
            <Network className="h-4 w-4" />
            Dual Stack Networking
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            Dual Stack IPv4 & IPv6<br />Enabled Server
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Accessible via both IPv4 and IPv6 — ensuring universal connectivity for every client.
          </p>
        </section>

        {/* IP Detection */}
        <section className="space-y-3 animate-fade-up" style={{ animationDelay: "150ms" }}>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Your Connection
          </h2>
          <IpDetector />
        </section>

        {/* IPv4 vs IPv6 Explainer */}
        <section className="space-y-6 animate-fade-up" style={{ animationDelay: "300ms" }}>
          <h2 className="text-2xl font-bold text-foreground">IPv4 vs IPv6</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold text-card-foreground">IPv4</h3>
              <p className="text-sm text-muted-foreground">
                32-bit address space (~4.3 billion addresses). The backbone of today's internet, but addresses are nearly exhausted.
              </p>
              <code className="block text-xs font-mono text-primary bg-accent px-2 py-1 rounded">
                e.g. 192.168.1.1
              </code>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold text-card-foreground">IPv6</h3>
              <p className="text-sm text-muted-foreground">
                128-bit address space (340 undecillion addresses). Built-in security, simplified routing, and future-proof connectivity.
              </p>
              <code className="block text-xs font-mono text-primary bg-accent px-2 py-1 rounded">
                e.g. 2001:0db8::1
              </code>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="space-y-6 animate-fade-up" style={{ animationDelay: "450ms" }}>
          <h2 className="text-2xl font-bold text-foreground">Infrastructure</h2>
          <FeatureGrid />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        Accessible via both IPv4 and IPv6 · CloudStack Demo
      </footer>
    </div>
  );
}
