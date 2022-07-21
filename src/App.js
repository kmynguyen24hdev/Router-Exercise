import { Route, Routes, Navigate, Link } from "react-router-dom";
import React, { Suspense } from "react";

import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";


//chi tai nhung component can thiet
const NewQuote = React.lazy(() => import("./pages/NewQuote"));
const AllQuotes = React.lazy(() => import("./pages/AllQuotes"));
const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Comments = React.lazy(() => import("./components/comments/Comments"));

function App() {
  return (
    <Layout>
      {/* Suspense: loading dự phòng để hiển thị cho đến khi component Event được tải xong. */}
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate replace to="/quotes" />} />
          <Route path="/quotes" element={<AllQuotes />} />
          <Route path="/quotes/:quoteId" element={<QuoteDetail />}>
            <Route
              path=""
              element={
                <div className="centered">
                  <Link className="btn--flat" to={`comments`}>
                    Load Comments
                  </Link>
                </div>
              }
            />
            <Route path={`comments`} element={<Comments />} />
          </Route>
          <Route path="/new-quote" element={<NewQuote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
