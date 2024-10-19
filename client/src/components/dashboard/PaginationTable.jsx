import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.jsx";

export default function PaginationTable({
  setpageIndex,
  pageIndex,
  totalPages,
  hasMore,
}) {
  return (
    <Pagination className="mt-8 cursor-pointer">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setpageIndex((prev) => Math.max(prev - 1, 0))}
            disabled={pageIndex === 0}
          />
        </PaginationItem>
        {pageIndex > 2 && (
          <PaginationItem>
            <PaginationLink onClick={() => setpageIndex(0)}>0</PaginationLink>
          </PaginationItem>
        )}
        {pageIndex > 3 && <PaginationEllipsis />}
        {Array.from({ length: totalPages + 1 }, (_, i) => i)
          .filter((p) => p < pageIndex + 2 && p > pageIndex - 2)
          .map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === pageIndex}
                onClick={() => setpageIndex(p)}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}
        {pageIndex < totalPages - 2 && <PaginationEllipsis />}
        {pageIndex < totalPages - 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => setpageIndex(totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => setpageIndex((prev) => (hasMore ? prev + 1 : prev))}
            disabled={!hasMore}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
