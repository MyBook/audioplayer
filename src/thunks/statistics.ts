import uuid from "uuid/v1";
import doFetch from "utils/doFetch";
import { sendStatisticsAction } from "actions/statistics";

export const sendStatistics = urls => async (
  dispatch: Function,
  getState: Function,
) => {
  const { book, statisticsSeconds } = getState();
  const statisticElement = {
    book_id: book.id,
    seconds: statisticsSeconds,
    date: new Date().toISOString(),
    uuid: uuid(),
  };

  if (+statisticsSeconds !== 0) {
    try {
      const { url, version } = urls.setStatistics();
      await doFetch({
        url,
        version,
        method: "POST",
        data: JSON.stringify({
          objects: [...getLocalStatistics(), statisticElement],
        }),
      });
      localStorage.setItem("statistics", "");
    } catch (e) {
      saveLocalStatistics(statisticElement);
    }

    dispatch(sendStatisticsAction());
  }
};

function getLocalStatistics() {
  const localItems = localStorage.getItem("statistics");
  if (!localItems) return [];
  const localStatistics = JSON.parse(localItems);
  return (localStatistics && localStatistics.objects) || [];
}

function saveLocalStatistics(statisticElement) {
  const localItems = localStorage.getItem("statistics");
  if (!localItems) return;
  const localStatistics = JSON.parse(localItems);
  const newLocalStatistics = JSON.stringify({
    objects: [
      ...((localStatistics && localStatistics.objects) || []),
      statisticElement,
    ],
  });

  localStorage.setItem("statistics", newLocalStatistics);
}
