import Link from "next/link";
import { Suspense } from "react"; //to make the component load with html from the server faster (Streaming)
import PostShow from "@/components/posts/PostShow";
import CommentList from "@/components/comments/CommentList";
import PostShowLoading from "@/components/posts/PostShowLoading";
import CommentCreateForm from "@/components/comments/CommentCreateForm";
import paths from "@/paths";


interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShowPath(slug)}>
        {"< "}Back to {slug}
      </Link>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList postId={postId} />
    </div>
  );
}
