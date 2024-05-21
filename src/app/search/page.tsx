import { redirect } from "next/navigation";
import PostList from "@/components/posts/PostList";
import { fetchPostBySearchTerm } from "@/db/queries/posts";

interface SearchPageProps{
  searchParams:{
    term: string;
  };
};

export default async function SearchPage({ searchParams}: SearchPageProps) {
  const { term } = searchParams;

  if(!term){
    redirect('/');
  };

  return (
    <div>
      <PostList fetchData={()=> fetchPostBySearchTerm(term)} />
    </div>
  );
};