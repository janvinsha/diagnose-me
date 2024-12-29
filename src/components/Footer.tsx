

export function Footer() {
    return (
        <footer className="py-6 md:py-[2rem] w-full">
            <p className="text-balance text-center text-sm leading-loose text-muted-foreground w-full">
                Built by{" "}
                <a
                    href="https://jandevincent.xyz/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                >
                    Vincent
                </a>
                . The source code is available on{" "}
                <a
                    href="https://github.com/janvinsha"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                >
                    GitHub
                </a>
                .
            </p>
        </footer>
    )
}
