import Link from "next/link";

import { categories } from "@/lib/constants";

export const metadata = {
  title: "پروداکت لوپ - دسته بندی ها",
};

const CategoriesPage = () => {
  return (
    <div className="space-y-6 p-5">
      <h2 className="text-center text-xl font-bold">دسته بندی ها</h2>
      <div className="mx-auto grid max-w-xl grid-cols-2 gap-3 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.english}
            href={`/categories/${cat.english}`}
            className="card border border-base-300 bg-base-100 shadow-md"
          >
            <div className="card-body">
              <div className="flex flex-col items-center gap-5 font-bold">
                {cat.persian}
                <cat.icon size={25} strokeWidth={1.5} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
