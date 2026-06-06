import { Html, Head,  Font, Body, Preview, Container, Img, Heading, Section, Text, Link, Hr } from "react-email";


interface Props {
    certificateId: string;
}

export const CreateCertificateEmail = ({
    certificateId,
}: Props) => (
    <Html lang='es'>
        <Head>
            <Font
                fontFamily="Roboto"
                fallbackFontFamily="Verdana"
                webFont={{
                    url: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap",
                    format: "woff2",
                }}
                fontWeight={400}
                fontStyle="normal"
            />
            <Font
                fontFamily="Figtree"
                fallbackFontFamily="Verdana"
                webFont={{
                    url: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap",
                    format: "woff2",
                }}
                fontWeight={400}
                fontStyle="normal"
            />
        </Head>
        <Body style={main}>
            <Preview>Log in with this magic link.</Preview>
            <Container style={container}>
                <Img
                    src={`https://www.innova-code.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.3179d26d.png&w=384&q=75`}
                    width={48}
                    height={48}
                    alt="Innova Code"
                    style={{
                        borderRadius: '15px'
                    }}
                />
                <Heading style={heading}>🥳 Felicitaciones!!</Heading>
                <Section style={body}>
                    <Text style={paragraph}>
                        Has completado el curso con éxito.
                        Esperamos que hayas disfrutado el aprendizaje y
                        adquirido nuevas habilidades.
                    </Text>

                    <Text style={paragraph}>
                        Ya puedes descargar tu certificado de finalización.
                    </Text>

                    <Text>
                        <Link style={link} href={`https://www.innova-code.dev/estudiantes/certificates/${certificateId}`}>
                            👉 Descarga aqui tu certificado 👈
                        </Link>
                    </Text>
                </Section>
                <Text style={paragraph}>
                    Existos,
                    <br />- Equipo de Innova Code 🫶
                </Text>
                <Hr style={hr} />
                <Img
                    src={`https://www.innova-code.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.3179d26d.png&w=384&q=75`}
                    width={32}
                    height={32}
                    style={{
                        WebkitFilter: 'grayscale(100%)',
                        filter: 'grayscale(100%)',
                        margin: '20px 0',
                        borderRadius: '10px'
                    }}
                />
                <Text style={footer}>
                    &copy;Innova Code 2025 - Todos los derechos reservados.
                </Text>
            </Container>
        </Body>
    </Html>
);

export default CreateCertificateEmail;

const main = {
    backgroundColor: '#111822',
    fontFamily: 'Roboto, Verdana, sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 25px 48px',
    backgroundImage: 'url("/static/raycast-bg.png")',
    backgroundPosition: 'bottom',
    backgroundRepeat: 'no-repeat, no-repeat',
};

const heading = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginTop: '48px',
    color: '#ffffff',
    fontFamily: 'Figtree, sans-serif',
};

const body = {
    margin: '24px 0',
};

const paragraph = {
    fontSize: '16px',
    lineHeight: '26px',
    color: '#ffffff',
    fontFamily: 'Roboto, sans-serif',
};

const link = {
    padding: '10px 15px',
    backgroundColor: '#754bf3',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#ffffff',
};

const hr = {
    borderColor: '#dddddd',
    marginTop: '48px',
};

const footer = {
    color: '#8898aa',
    fontSize: '12px',
    marginLeft: '4px',
};