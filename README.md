
# Player for audiobooks

## Install

```bash
npm install @mybook/audio-player-js styled-components@4.3.0
---
yarn add @mybook/audio-player-js styled-components@4.3.0
```

## Try it out

```js
import React from "react";
import Player from "@mybook/audio-player-js";
import Link from "react-router-dom";

function TrialMessage() {
  return <div>Сообщение о покупке подписки</div>;
}

function playerOptions(isActiveSubscription) {
  return {
    Link: Link,
    TrialMessage: TrialMessage,
    isFreeFragment: !isActiveSubscription,
    colors: {
      almostWhite: "#F4F4F4",
      primary: "#00B0C2",
      gray: "#545454",
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
  };
}

export default class App extends React.Component {
  render() {
    return (
      <Player bookId={bookId} {...playerOptions(user.isActiveSubscription)} />
    );
  }
}
```


## Tracking functions

```js
import ya from "./yandexMetrika";

window.player.trackingFunctions = {
  onPlay: () => {
    ya("player_play");
  },
  onPause: () => {
    ya("player_pause");
  },
  onForward: () => {
    ya("player_forward");
  },
  onBackward: () => {
    ya("player_backward");
  },
  onChangeVolume: () => {
    ya("player_change_volume");
  },
  onMute: () => {
    ya("player_mute");
  },
  onChangeTempo: () => {
    ya("player_change_tempo");
  },
  onOpenTempo: () => {
    ya("player_open_tempo");
  },
  onChangeChapter: () => {
    ya("player_change_chapter");
  },
  onOpenTableOfContents: () => {
    ya("player_open_table_of_contents");
  },
  onKeyMute: () => {
    ya("player_key_mute");
  },
  onKeyForward: () => {
    ya("player_key_forward");
  },
  onKeyBackward: () => {
    ya("player_key_backward");
  },
  onKeyPause: () => {
    ya("player_key_pause");
  },
  onKeyPlay: () => {
    ya("player_key_play");
  },
};
```

Also need to upgrade webpack config:
```js
  resolve: {
    alias: {
      react: path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom"),
      "styled-components": path.resolve("./node_modules/styled-components"),
    },
  },
```

## Tests
Under constructions 🚧
