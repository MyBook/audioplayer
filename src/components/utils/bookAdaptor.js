export function bookAdaptor(book) {
  const {
    web_url,
    main_author: { web_url: authorWebUrl, cover_name },
    series: seriesRaw = [],
    font_color,
    background_color,
    link_color,
    tags: tagsRaw = [],
  } = book;
  const bookLink = getLink(web_url);
  const authorLink = getLink(authorWebUrl);
  const authorName = cover_name;
  const series = seriesRaw[0] && seriesRaw[0].series;
  const tags = itemAdaptor(tagsRaw);

  return {
    ...book,
    bookLink,
    authorLink,
    authorName,
    series,
    tags,
    font_color: `#${font_color}`,
    background_color: `#${background_color}`,
    link_color: `#${link_color}`,
  };
}

function itemAdaptor(items) {
  return items.map(item => {
    const { web_url } = item;
    const link = getLink(web_url);

    return { ...item, web_url: link };
  });
}

const baseUrl = /^https?:\/\/[^/]*/;

function getLink(link) {
  return link.replace(baseUrl, "");
}
