import { useState, useEffect } from "react";

interface IpInfo {
  ip: string;
  type: "IPv4" | "IPv6" | "Unknown";
}

export function useIpDetection() {
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detect = async () => {
      try {
        const res = await fetch("https://api64.ipify.org?format=json");
        const data = await res.json();
        const ip: string = data.ip;
        const type = ip.includes(":") ? "IPv6" : "IPv4";
        setIpInfo({ ip, type });
      } catch {
        setIpInfo({ ip: "Unable to detect", type: "Unknown" });
      } finally {
        setLoading(false);
      }
    };
    detect();
  }, []);

  return { ipInfo, loading };
}
