import { formatDate } from "../../utils/formatDate";

export function PostDate({post , format = "medium"}) {
    return (
        <>
        {post.publishedAt ? (
            <>
            Published:{" "}
            <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt, format)}
            </time>
            </>
        ) : (
            <>
            Created:{" "}
            <time dateTime={post.createdAt}>
                {formatDate(post.createdAt, format)}
            </time>
            {post.updatedAt !== post.createdAt && (
                <>
                {" · "}Updated:{" "}
                <time dateTime={post.updatedAt}>
                    {formatDate(post.updatedAt, format)}
                </time>
                </>
            )}
            </>
        )}
        </>
    )
}