"use server";
import { db } from "@/db";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const SubscriberFormSchema = z.object({
  id: z.number(),
  email: z.string().min(1, { message: "Email is required." }),
  isSubscribed: z.boolean(),
});

const CreateSubscriber = SubscriberFormSchema.omit({ id: true, isSubscribed: true });

type State = {
  errors?: {
    email?: string[];
  };
  message?: string | null;
};

// 创建订阅者
export async function createSubscriber(prevState: State, formData: FormData) {
  const validatedField = CreateSubscriber.safeParse({
    email: formData.get("email"),
  });

  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      message: "Email is Required",
    };
  }

  const { email } = validatedField.data;

  try {
    await db.subscriber.create({
      data: {
        email: email,
      },
    });
    revalidatePath("/");
    return { message: "Thank you for Subscribing!" };
  } catch (error) {
    if (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return {
            message: "Email already Exist in the DB",
          };
        }
      }
    }
    return { message: "Database Error: Failed to create Subscriber." };
  }
}




const CreateCommentSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().min(1, { message: "Email is required." }),
  content: z.string().min(1, { message: "Content is required." }),
});
const createComm = CreateCommentSchema.omit({ name: true, email: true, content: true });

// 创建评论
export async function createComment(prevState: State, formData: FormData) {
  const validatedField = createComm.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
    content: formData.get("content"),
  });

  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      message: "email and name and content are Required",
    };
  }

  const { email, name, content, blog } = validatedField.data;

  try {
    await db.subscriber.create({
      data: {
        email,
        name,
        content,
        blog,
        created_at: dayjs().format('YYYY-MM-DDTHH:mm:ss[Z]'),
      },
    });
    revalidatePath("/");
    return { message: "Thank you for comment!" };
  } catch (error) {
    if (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return {
            message: "your comment already Exist in the DB",
          };
        }
      }
    }

    return { message: "Database Error: Failed to create Subscriber." };
  }
}

