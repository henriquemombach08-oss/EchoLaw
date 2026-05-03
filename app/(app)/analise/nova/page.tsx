import { UploadZone } from '@/components/upload-zone'

export default function NovaAnalisePage() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full space-y-12">
        {/* Hero Content */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-on-background leading-tight">
            Inicie uma <span className="text-primary italic">Nova Análise</span> Jurídica
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed">
            Processamento seguro de documentos com inteligência artificial especializada em legislação brasileira.
          </p>
        </div>

        {/* Bento grid: UploadZone + side cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Upload area */}
          <div className="md:col-span-8">
            <UploadZone />
          </div>

          {/* Side guidance cards */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="bg-secondary-container p-6 rounded-xl space-y-3">
              <span className="material-symbols-outlined text-tertiary">verified_user</span>
              <h4 className="font-bold text-on-secondary-container">Segurança Máxima</h4>
              <p className="text-sm text-on-secondary-fixed-variant">Seus arquivos são criptografados e excluídos após análise.</p>
            </div>
            <div className="bg-surface-container-high p-6 rounded-xl space-y-3">
              <span className="material-symbols-outlined text-primary">gavel</span>
              <h4 className="font-bold text-on-surface">Precisão Legal</h4>
              <p className="text-sm text-on-surface-variant">Base de dados atualizada com legislação brasileira.</p>
            </div>
          </div>
        </div>

        {/* Tip banner */}
        <div className="flex items-center gap-4 bg-[#f8e0a8]/30 p-4 rounded-lg border border-[#c4a66a]">
          <span className="material-symbols-outlined text-[#554020]">lightbulb</span>
          <p className="text-sm text-[#554020] font-medium">
            <strong className="font-bold">Dica:</strong> Documentos digitalizados com alta resolução resultam em análises mais rápidas e precisas.
          </p>
        </div>
      </div>
    </div>
  )
}
