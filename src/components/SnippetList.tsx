"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSnippets } from "@/store/snippetSlice";
import SnippetCard from "./SnippetCard";
import { RootState, AppDispatch } from "@/store/store";
import Loader from "./Loader";

interface SnippetListProps {
    search: string;
}

const ITEMS_PER_PAGE = 10;

const SnippetList: React.FC<SnippetListProps> = (props) => {
    const { search } = props;
    const dispatch = useDispatch<AppDispatch>();
    const snippets = useSelector((state: RootState) => state.snippets.snippets);
    const status = useSelector((state: RootState) => state.snippets.status);
    // const [page,] = useState(1)
    const page = 1;
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchSnippets());
        }
        console.log(status);
    }, [status, dispatch]);

    const filteredSnippets = snippets.filter((snippet) =>
        snippet.title.toLowerCase().includes(search.toString().toLowerCase())
    );
    // const totalPages = Math.ceil(filteredSnippets.length / ITEMS_PER_PAGE)
    const paginatedSnippets = filteredSnippets.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    if (status === "loading") {
        const LoaderNum = 3;
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(LoaderNum)].map((_, index) => (
                    <Loader key={index} />
                ))}
            </div>
        );
    }

    if (!snippets.length) {
        return (
            <div className="text-2xl text-semibold text-gray-950 dark:text-gray-100 text-center font-bold">
                No snippets yet!
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedSnippets.map((snippet) => (
                    <SnippetCard key={snippet._id} snippet={snippet} />
                ))}
            </div>
            {/* <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="btn btn-secondary"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="btn btn-secondary"
        >
          Next
        </button>
      </div> */}
        </div>
    );
};

export default SnippetList;