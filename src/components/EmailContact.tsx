import { toast } from "sonner";

export function EmailContact({ language = "pt" }: { language?: "pt" | "en" }) {
  return (
    <span className="inline-flex items-center gap-1">
      <strong>Email:</strong>{" "}
      <button
        onClick={() => {
          navigator.clipboard.writeText("info@scooli.app");
          toast.success(
            language === "pt"
              ? "Endereço de email copiado para a área de transferência"
              : "Email address copied to clipboard"
          );
        }}
        aria-label={
          language === "pt"
            ? "Copiar email info@scooli.app"
            : "Copy email info@scooli.app"
        }
        className="underline cursor-pointer text-blue-700 hover:text-blue-900 transition-colors duration-200"
        style={{ position: "relative", zIndex: 1 }}
      >
        info@scooli.app
      </button>
    </span>
  );
}
