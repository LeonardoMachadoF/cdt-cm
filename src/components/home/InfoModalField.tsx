type Props = {
    label: string;
    info: string;
}

export function InfoModalField({ label, info }: Props) {
    return (
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-medium">{info}</p>
        </div>
    )
}