import { queryOptions } from "@tanstack/react-query";
// import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import json from "./posts.json";

export type PostType = {
  id: string;
  title: string;
  body: string;
};

export const fetchPosts = createServerFn({ method: "GET" }).handler(
  async () => {
    console.info("Fetching posts...");
    return json.slice(0, 10);
  }
);

export const postsQueryOptions = () =>
  queryOptions({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

export const fetchPost = createServerFn({ method: "GET" })
  .validator((d: string) => d)
  .handler(async ({ data }) => {
    console.info(`Fetching post with id ${data}...`);
    return json.find((post) => post.id === Number(data)) ?? null;
  });

export const postQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ["post", postId],
    queryFn: () => fetchPost({ data: postId }),
  });
