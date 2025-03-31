import { queryOptions } from "@tanstack/react-query";
import json from "./users.json";

export type User = {
  id: number;
  name: string;
  email: string;
};

export enum Buckets {
  evens = "evens",
  odds = "odds",
}

export const DEPLOY_URL = "http://localhost:3000";

export const usersQueryOptions = (bucket?: Buckets) =>
  queryOptions({
    queryKey: ["users", bucket],
    queryFn: () =>
      json.filter((user) =>
        bucket === Buckets.evens ? user.id % 2 === 0 : user.id % 2 !== 0
      ),
  });

export const userQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["users", id],
    queryFn: () => json.find((post) => post.id === Number(id)) ?? null,
  });
