import { UploadZone } from '@/components/upload-zone'

export default function NovaAnalisePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Analisar documento</h1>
        <p className="text-gray-500">
          Envie um contrato, notificação, multa ou qualquer documento jurídico.
        </p>
      </div>
      <UploadZone />
    </div>
  )
}
