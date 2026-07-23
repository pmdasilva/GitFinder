type ListUsersProps = {
    title: string
    description: string
    url?: string
}

export default function ListUsers({ title, description, url }: ListUsersProps) {
    return (
        <div className="mb-5 mt-5">
            {url ? (
                <a className="text-2xl text-blue-300 mt-3 mb-3 font-bold" href={url} target="_blank" rel="noreferrer">
                    {title}
                </a>
            ) : (
                <strong className="text-2xl text-blue-300 mt-3 mb-3">{title}</strong>
            )}
            <p className="text-2xl text-gray-500 mt-3 mb-3">{description}</p>
            <hr />
        </div>
    )
}
