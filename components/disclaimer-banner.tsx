export function DisclaimerBanner() {
  return (
    <div className="bg-[#f8e0a8] text-[#221a05] py-2 px-4 text-center text-xs sticky top-0 z-50 flex items-center justify-center gap-2">
      <span
        className="material-symbols-outlined text-sm"
        style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 20" }}
      >
        warning
      </span>
      Aviso Jurídico: Esta análise é auxiliada por IA e não substitui o parecer de um advogado devidamente habilitado.
    </div>
  )
}
