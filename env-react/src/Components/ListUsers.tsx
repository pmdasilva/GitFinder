type ListUsersProps = {
    title: string
    description: string
    url?: string
    className?: string
}

export default function ListUsers({ title, description, url, className }: ListUsersProps) {
    return (
        <div className={`sm:mb-5 mt-5 p-5 text-wrap w-auto ${className}`}>
            {url ? (
                <a className="sm: uppercase text-gray-200 font-bold" href={url} target="_blank" rel="noreferrer">
                    {title}
                </a>
            ) : (
                <strong className="sm: capitalize text-blue-300 mt-3 mb-3">{title}</strong>
            )}
            <p className="sm: text-gray-200 mt-3 mb-3">{description}</p>

        </div>
    )
}
