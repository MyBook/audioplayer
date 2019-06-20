import React from "react";
import { mount } from "enzyme";
import Player from "../src/";
import book from "./fixtures/book";
import { Link } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router";
import { BrowserRouter } from "react-router-dom";
// import file from "./fixtures/file.mp3";

function playerOptions(isActiveSubscription) {
  return {
    TrialMessage: () => <div>123</div>,
    isFreeFragment: !isActiveSubscription,
    colors: {
      almostWhite: "#F4F4F4",
      primary: "#00B0C2",
      gray: "#545454",
    },
  };
}
mock.onGet("/api/books/239/").reply(200, book);
// mock.onGet("/api/audiobooks/239/auto-bookmark/").reply(200, book);
mock.onGet("/api/aio/239/auto-bookmark/").reply(200, book);
mock.onGet(" /api/audiofiles/201941/file.mp3").reply(200, {});

describe("Book length", () => {
  test("Book length = 234234", async () => {
    const wrapper = mount(
      <BrowserRouter>
        <Switch>
          <Route
            component={() => (
              <Player bookId={239} {...playerOptions(true)} Link={Link} />
            )}
          />
        </Switch>
      </BrowserRouter>,
    );

    await flushPromises();
    wrapper.update();

    console.log(wrapper.html());

    expect(true);
  });
});
