import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex mt-20 flex-col items-center justify-center gap-8">
      <img src="/assets/404.gif" className="w-[450px] rounded-xl shadow-sm" alt="Not found" />
      <h2 className="text-3xl font-bold">چیزی که دنبالشی رو پیدا نکردیم !</h2>
      <Link href="/" className="btn btn-secondary">
        برو به صفحه اصلی
      </Link>
    </div>
  );
};

export default NotFoundPage;
