import SearchForm from "@/src/components/forms/SearchForm";

export default function SearchResults({
  searchParams,
}: {
  searchParams: { query: string };
}) {

  return (
    <>
      <div className="flex flex-col w-[calc(100vw-1rem)] items-start px-8 justify-start gap-2">
        <SearchForm queryParam={searchParams.query} />
      </div>
      
    </>
  );
}
