import type { Post } from "@prisma/client";
import { db } from "@/db";


export type PostWithData = (
  Post & {
    topic: { slug: string };
    user: { name: string | null };
    _count: { comments: number };
  }
);

// export type PostWithData = Awaited<
//   ReturnType<typeof FetchPostsByTopicSlug>
// >[number]; 
//looks at the type of FetchPostsByTopicSlug, it looks at the return type, it will unwrap that bc returning a promise
// bc we are resolving a promise with an array of post objs [number] means take a type of one element inside this array

export function fetchPostBySearchTerm(term: string): Promise<PostWithData[]> {
  return db.post.findMany({
    include: { 
      topic: { select: { slug: true }},
      user: { select: { name: true, image: true }},
      _count: { select: { comments: true }}
    },
    where: {
      OR: [
        { title: { contains: term }},
        { content: { contains: term }}
      ]
    }
  });
};


export function fetchPostsByTopicSlug(slug: string): Promise<PostWithData[]>{
  return db.post.findMany({
    where: { topic: { slug } },
    include: { //include the extra data to the obj
      topic: { select: { slug: true }}, //just to select the slug property in topics
      user: { select: { name: true }},
      _count: { select: { comments: true }}
    }
  });
};

export function fetchTopPosts(): Promise<PostWithData[]> {
  return db.post.findMany({
    orderBy: [
      { 
        comments: {
          _count: "desc" //order by most counts
        }
      }
    ],
    include: {
      topic: { select: { slug: true }}, 
      user: { select: { name: true, image: true }},
      _count: { select: { comments: true }}
    },
    take: 5, //show only 5 posts
  });
};