export default function DateLabel({ iso }: { iso: string }) {
    const d = new Date(iso);

    const time = d.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Paris",
    });

    const date = d.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "2-digit",
        timeZone: "Europe/Paris",
    });

    return <span>{`${time} - ${date}`}</span>;
}