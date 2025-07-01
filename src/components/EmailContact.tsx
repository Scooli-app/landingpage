import { toast } from "sonner";

export function EmailContact() {
  return (
    <span className="inline-flex items-center gap-1">
      <strong>Email:</strong>{" "}
      <a
        onClick={() => {
          navigator.clipboard.writeText("info@scooli.app");
          toast.success(
            "Endereço de email copiado para a área de transferência"
          );
        }}
        className="underline cursor-pointer text-blue-700 hover:text-blue-900 transition-colors duration-200"
        style={{ position: "relative", zIndex: 1 }}
      >
        info@scooli.app
      </a>
    </span>
  );
}
