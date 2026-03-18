export function Badge({label, level}: { label: string; level: "success" | "warning" | "info" }) {
    return (
        <span className={`badge badge-${level}`}>
            {label}
        </span>
    );
}