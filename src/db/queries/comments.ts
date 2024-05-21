import type { Comment } from "@prisma/client";
import { cache } from "react";  //for cache memorization request to handle multiple duplicate requests (remove duplicate req)
import { db } from "@/db";

export type CommentWithAuthor = (
  Comment & {
    user: { 
      name: string | null, 
      image: string | null 
    }
  }
);

export const fetchCommentsByPostId = cache(
  (postId: string): Promise<CommentWithAuthor[]> => {
    console.log('Making a Query!')
    return db.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: { 
            name: true, 
            image: true
          },
        },
      },
    });
  }
);