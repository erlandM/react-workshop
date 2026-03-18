export function Paragraph({text,textsize} : { text: string; textsize: number }) {
    return (
        <p style={{ fontSize: `${textsize}px` }}>
            {text}
        </p>
    );
}