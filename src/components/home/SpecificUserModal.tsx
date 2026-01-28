import type { User } from "../../types/User"
import { InfoModalField } from "./InfoModalField";

type Props = {
    user: User;
    onClose: () => void;
}

export function SpecificUserModal({ user, onClose }: Props) {
    return (
        <div className="fixed inset-0 flex items-start pt-40 justify-center bg-black/80 z-50">
            <div className="bg-white rounded-lg max-w-lg w-full p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Detalhes do Usuário</h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer text-gray-400 hover:text-gray-600 text-2xl"
                    >
                        ×
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    <InfoModalField label="Nome" info={user.name} />
                    <InfoModalField label="E-mail" info={user.email} />
                    <InfoModalField label="Telefone" info={user.phone} />
                    <InfoModalField label="Empresa" info={user.company.name} />
                    <InfoModalField label="Cidade" info={user.address.city} />
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 w-full py-2 bg-black text-white rounded-lg cursor-pointer"
                >
                    Fechar
                </button>
            </div>
        </div>
    )
}