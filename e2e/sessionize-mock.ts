import type { Page } from "@playwright/test";
import grid from "./fixtures/grid.json";
import speakers from "./fixtures/speakers.json";

export const EVENT_ID = "e2e-test-event";

/** Mock the Sessionize API with the synthetic fixtures (no real speaker data in the repo). */
export async function mockSessionize(
  page: Page,
  opts: { failWith?: number } = {}
) {
  await page.route(
    `https://sessionize.com/api/v2/${EVENT_ID}/view/**`,
    async (route) => {
      if (opts.failWith) {
        return route.fulfill({ status: opts.failWith, body: "error" });
      }
      const url = route.request().url();
      const body = url.endsWith("/GridSmart")
        ? grid
        : url.endsWith("/Speakers")
          ? speakers
          : null;
      if (!body) return route.fulfill({ status: 404, body: "not found" });
      return route.fulfill({
        json: body,
        headers: { "access-control-allow-origin": "*" },
      });
    }
  );
}
