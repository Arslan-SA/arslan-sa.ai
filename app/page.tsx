import { IDEProvider } from "@/hooks/useIDEState";
import IDEShell from "@/components/ide/IDEShell";

export default function Home() {
  return (
    <IDEProvider>
      <IDEShell />
    </IDEProvider>
  );
}
