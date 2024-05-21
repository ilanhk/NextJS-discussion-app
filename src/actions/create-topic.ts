'use server';

import type { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod"; //for validation of any type of variable
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";

const createTopicSchema = z.object({
  name: z.string().min(3).regex(/^[a-z-]+$/, { message: 'must be lowercase letters or dashes without spaces.'}), //name must be a string, must be 3 characters, only lowercase and dash is allowed
  description: z.string().min(10),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[]
  }
};

export async function createTopic(formstate: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState> {

  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description')
  });
  // createTopicSchema.safeParse will check if the data from the form matches the schema

  if(!result.success){
    return { errors: result.error.flatten().fieldErrors };
  };

  const session = await auth();

  if (!session || !session.user){
    return { errors: { _form: ['You need to be signed in.']}};
  };

  
  let topic: Topic;

  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (err: unknown) {
    if(err instanceof Error){
      return {
        errors: {
          _form: [err.message]
        }
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong']
        }
      };
    };
  };

  //ToDo: revalidate homepage after creating a topic
  revalidatePath('/'); //needs to be above redirect
  redirect(paths.topicShowPath(topic.slug));
  
};
//Promise<CreateTopicFormState> it returns a promise bc its an async function
// _form?: string[] this is for other errors that may pop up in this form. Will be undefined if nothing wrong with the form