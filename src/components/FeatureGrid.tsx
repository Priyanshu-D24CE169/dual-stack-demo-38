import { Globe, Server, Shield, Wifi } from "lucide-react";

const features = [
  { icon: Globe, title: "Dual Stack", desc: "Full IPv4 & IPv6 support on every endpoint" },
  { icon: Shield, title: "Secure by Default", desc: "End-to-end encrypted across both protocols" },
  { icon: Server, title: "Global Edge", desc: "Low-latency nodes worldwide" },
  { icon: Wifi, title: "Auto Routing", desc: "Intelligent protocol selection per client" },
];

export default function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {features.map((f, i) => (
        <div
          key={f.title}
          className="group rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
          style={{ animationDelay: `${i * 100 + 200}ms` }}
        >
          <div className="mb-3 inline-flex rounded-md bg-accent p-2.5 text-accent-foreground">
            <f.icon className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-card-foreground">{f.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
