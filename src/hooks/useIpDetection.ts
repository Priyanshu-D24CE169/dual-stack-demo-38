import { useState, useEffect } from "react";

interface IpInfo {
  ip: string;
  type: "IPv4" | "IPv6" | "Unknown";
  method: "local" | "api" | "fallback";
}

export function useIpDetection() {
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let resolved = false;

    const detectLocal = (): Promise<IpInfo[]> => {
      return new Promise((resolve) => {
        const ips: IpInfo[] = [];
        try {
          const pc = new RTCPeerConnection({ iceServers: [] });
          pc.createDataChannel("");

          pc.onicecandidate = (e) => {
            if (!e.candidate) {
              pc.close();
              resolve(ips);
              return;
            }
            const parts = e.candidate.candidate.split(" ");
            const ip = parts[4];
            if (ip && !ip.endsWith(".local") && !ips.find((i) => i.ip === ip)) {
              const type = ip.includes(":") ? "IPv6" : "IPv4";
              ips.push({ ip, type, method: "local" });
            }
          };

          pc.createOffer().then((offer) => pc.setLocalDescription(offer));

          // Timeout after 3s
          setTimeout(() => {
            pc.close();
            resolve(ips);
          }, 3000);
        } catch {
          resolve(ips);
        }
      });
    };

    const detectApi = async (): Promise<IpInfo | null> => {
      try {
        const res = await fetch("https://api64.ipify.org?format=json", {
          signal: AbortSignal.timeout(4000),
        });
        const data = await res.json();
        const ip: string = data.ip;
        const type = ip.includes(":") ? "IPv6" : "IPv4";
        return { ip, type, method: "api" };
      } catch {
        return null;
      }
    };

    const run = async () => {
      // Run both in parallel
      const [localIps, apiResult] = await Promise.all([
        detectLocal(),
        detectApi(),
      ]);

      if (resolved) return;
      resolved = true;

      // Prefer API result for public IP, but use local if offline
      if (apiResult) {
        setIpInfo(apiResult);
      } else if (localIps.length > 0) {
        // Prefer IPv6 if available
        const ipv6 = localIps.find((i) => i.type === "IPv6");
        setIpInfo(ipv6 || localIps[0]);
      } else {
        setIpInfo({ ip: "No network detected", type: "Unknown", method: "fallback" });
      }
      setLoading(false);
    };

    run();
  }, []);

  return { ipInfo, loading };
}
