import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";

import Player from "./Player";

const isActiveSubscription = true;

function options() {
  return {
    isEnableAutoplay: true,
    Link: Link,
    TrialMessage: () => <div>123</div>,
    isFreeFragment: !isActiveSubscription,
    styles: {
      almostWhite: "#F4F4F4",
      primary: "#00B0C2",
      gray: "#545454",
      borderRadius: "24px",
    },
    urls: {
      getBook: bookId => ({ url: `audiobooks/${bookId}/`, version: 4 }),
      getAutoBookmark: bookId => ({
        url: `audiobooks/${bookId}/auto-bookmark/`,
      }),
      setAutoBookmark: () => ({ url: "auto-bookmarks/" }),
      setStatistics: () => ({ url: "statistics/" }),
    },
    bookAdaptor: book => {
      const {
        web_url,
        main_author: { web_url: authorWebUrl, cover_name },
      } = book;
      const bookLink = web_url;
      const authorLink = authorWebUrl;

      return {
        ...book,
        bookLink,
        authorLink,
        authorName: cover_name,
      };
    },
    seriesAdaptor: series => {
      const { web_url, name, default_image, id, book_count } = series;

      return {
        id,
        name,
        url: getLink(web_url),
        cover: default_image,
        bookCount: book_count,
      };
    },
  };
}
const baseUrl = /^https?:\/\/[^/]*/;

function getLink(link) {
  return link.replace(baseUrl, "");
}

window.player = {};

function App() {
  const [bookId, changeBookId] = useState(0);

  function setBookId() {
    console.log(1);
    changeBookId(1);
  }
  console.log(bookId);
  return (
    <BrowserRouter>
      <div onClick={setBookId}>play</div>
      <Player {...options(true)} bookId={bookId} />
    </BrowserRouter>
  );
}

render(<App />, document.querySelector("#app"));
