import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { Buckets, usersQueryOptions } from "../utils/users";

type UsersSearchParams = {
  bucket?: Buckets;
};
export const Route = createFileRoute("/users")({
  validateSearch: (search) => {
    return search as UsersSearchParams;
  },
  loaderDeps: ({ search: { bucket } }) => ({
    bucket,
  }),
  loader: async ({ context, deps: { bucket } }) => {
    await context.queryClient.ensureQueryData(usersQueryOptions(bucket));
  },
  component: UsersComponent,
});

function UsersComponent() {
  const { bucket } = Route.useSearch();
  const usersQuery = useSuspenseQuery(usersQueryOptions(bucket));

  return (
    <div className="p-2 flex gap-2">
      <div className="flex gap-2">
        <Link
          to="/users"
          search={{ bucket: Buckets.evens }}
          className={`px-4 py-2 border ${
            bucket === Buckets.evens ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Evens
        </Link>
        <Link
          to="/users"
          search={{ bucket: Buckets.odds }}
          className={`px-4 py-2 border ${
            bucket === Buckets.odds ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Odds
        </Link>
      </div>
      <ul className="list-disc pl-4">
        {[
          ...usersQuery.data,
          { id: "i-do-not-exist", name: "Non-existent User", email: "" },
        ].map((user) => {
          return (
            <li key={user.id} className="whitespace-nowrap">
              <Link
                to="/users/$userId"
                params={{
                  userId: String(user.id),
                }}
                className="block py-1 text-blue-800 hover:text-blue-600"
                activeProps={{ className: "text-black font-bold" }}
              >
                <div>{user.name}</div>
              </Link>
            </li>
          );
        })}
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}
