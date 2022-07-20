import { useEffect } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

const DUMMY_QUOTES = [
  {
    id: "q1",
    author: "Max",
    text: "Learning React is fun!",
  },
  {
    id: "q2",
    author: "Max min",
    text: "Learning JS is fun!",
  },
  {
    id: "q3",
    author: "Mami",
    text: "Learning React is happy!",
  },
];

function QuoteDetail() {
  //lay path hien tai cua trang
  const match = useRouteMatch();
  const params = useParams();

  const {quoteId} = params;

  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

  if(status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    )
  }

  if(error) {
    return <p className="centered">{error}</p>
  }

  if (!loadedQuotes.text) {
    return <p>No quote found</p>;
  }

  return (
    <section>
      <HighlightedQuote text={loadedQuotes.text} author={loadedQuotes.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </section>
  );
}

export default QuoteDetail;
