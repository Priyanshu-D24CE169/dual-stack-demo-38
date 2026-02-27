import { useIpDetection } from "@/hooks/useIpDetection";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function IpDetector() {
  const { ipInfo, loading } = useIpDetection();

  return (
    <div className="rounded-lg border border-border bg-terminal-bg p-5 font-mono text-sm animate-pulse-glow">
      <div className="flex items-center gap-2 mb-3">
        <span className="h-3 w-3 rounded-full bg-destructive" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-primary" />
        <span className="ml-2 text-xs text-muted-foreground">network-probe</span>
      </div>

      <div className="space-y-2 text-terminal-fg">
        <p>
          <span className="text-muted-foreground">$</span> detecting client protocol...
          {loading && <span className="animate-blink ml-1">▊</span>}
        </p>

        {!loading && ipInfo && (
          <>
            <p className="flex items-center gap-2">
              {ipInfo.type !== "Unknown" ? (
                <CheckCircle2 className="h-4 w-4 text-primary" />
              ) : (
                <AlertCircle className="h-4 w-4 text-destructive" />
              )}
              <span>
                Protocol: <strong>{ipInfo.type}</strong>
              </span>
            </p>
            <p>
              <span className="text-muted-foreground">IP:</span> {ipInfo.ip}
            </p>
          </>
        )}

        {loading && (
          <p className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> resolving...
          </p>
        )}
      </div>
    </div>
  );
}
