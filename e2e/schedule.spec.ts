import { expect, test } from "@playwright/test";
import { mockSessionize } from "./sessionize-mock";

test.describe("スケジュールページ", () => {
  test.beforeEach(async ({ page }) => {
    await mockSessionize(page);
  });

  test("ページタイトルとヘッダーが表示される", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("デッカイギ2027 スケジュール");
    await expect(page.getByAltText("デッカイギロゴ")).toBeVisible();
    const bocchi = page.getByRole("link", { name: /ぼっち飯対策企画/ });
    await expect(bocchi).toBeVisible();
    await expect(bocchi).toHaveAttribute("href", /docs\.google\.com\/spreadsheets/);
    await expect(bocchi).toHaveAttribute("target", "_blank");
  });

  test("2027 年の OGP / Twitter カードが設定されている", async ({ page }) => {
    await page.goto("/");
    const meta = (selector: string) =>
      page.locator(selector).first().getAttribute("content");
    expect(await meta('meta[property="og:title"]')).toBe("デッカイギ2027 スケジュール");
    expect(await meta('meta[property="og:site_name"]')).toBe("デッカイギ2027 スケジュール");
    expect(await meta('meta[name="description"]')).toContain("2027年1月8日（金）・9日（土）");
    expect(await meta('meta[property="og:description"]')).toContain("羽田イノベーションシティ");
    expect(await meta('meta[property="og:url"]')).toBe("https://program.dekaigi.org/");
    expect(await meta('meta[property="og:image"]')).toBe("https://program.dekaigi.org/images/ogp.png");
    expect(await meta('meta[property="og:image:width"]')).toBe("1200");
    expect(await meta('meta[property="og:image:height"]')).toBe("630");
    expect(await meta('meta[name="twitter:card"]')).toBe("summary_large_image");
    expect(await meta('meta[name="twitter:title"]')).toBe("デッカイギ2027 スケジュール");
    expect(await meta('meta[name="twitter:image"]')).toBe("https://program.dekaigi.org/images/ogp.png");
  });

  test("OGP 画像が 1200x630 で配信されている", async ({ request }) => {
    const res = await request.get("/images/ogp.png");
    expect(res.ok()).toBe(true);
    const png = await res.body();
    // PNG の IHDR から幅と高さを読む
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
  });

  test("1日目のタイムテーブルが表示される", async ({ page }) => {
    await page.goto("/");
    // 日付タブ: 選択中の日はリンクではなく、他の日はリンク
    await expect(page.getByText("1月10日", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "1月11日" })).toBeVisible();

    await expect(page.getByText("オープニング")).toBeVisible();
    await expect(page.getByText("テストセッション1")).toBeVisible();
    await expect(page.getByText("テストセッション2")).toBeVisible();
    // 時刻・時間・セッション種別・スピーカー名
    await expect(page.getByText("10:30〜60分")).toBeVisible();
    await expect(page.getByText("10:30〜30分")).toBeVisible();
    await expect(page.getByText("講演", { exact: true })).toBeVisible();
    await expect(page.getByText("ワークショップ", { exact: true })).toBeVisible();
    await expect(page.getByText("テスト", { exact: true })).toBeVisible();
    // 2日目のセッションは表示されない
    await expect(page.getByText("二日目のセッション")).toHaveCount(0);
  });

  test("no-underline 指定のリンクには下線が付かない", async ({ page }) => {
    // グローバルの a { underline } がユーティリティクラスを上書きしないこと
    await page.goto("/");
    const tab = page.getByRole("link", { name: "1月11日" });
    await expect(tab).toHaveCSS("text-decoration-line", "none");
  });

  test("日付タブで2日目に切り替えられる", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "1月11日" }).click();
    await expect(page.getByText("二日目のセッション")).toBeVisible();
    await expect(page.getByText("休憩")).toBeVisible();
    await expect(page.getByText("テストセッション1")).toHaveCount(0);
    await expect(page).toHaveURL(/#1$/);
  });

  test("URL ハッシュで2日目を直接開ける", async ({ page }) => {
    await page.goto("/#1");
    await expect(page.getByText("二日目のセッション")).toBeVisible();
  });

  test("セッションをクリックすると詳細ダイアログが開き、閉じられる", async ({ page }) => {
    await page.goto("/");
    await page.getByText("テストセッション1").click();

    const dialog = page.getByRole("dialog", { name: "テストセッション1" });
    await expect(dialog.getByRole("heading", { name: "テストセッション1" })).toBeVisible();
    await expect(dialog.getByText("セッション1の説明文です。")).toBeVisible();
    // スピーカー詳細
    await expect(dialog.getByText("テスト株式会社")).toBeVisible();
    await expect(dialog.getByText("テスト太郎のプロフィールです。")).toBeVisible();
    await expect(dialog.getByRole("link", { name: /x\.com\/example_taro/ })).toBeVisible();
    // シェアボタン
    await expect(dialog.getByRole("button", { name: "Share on X" })).toBeVisible();
    await expect(page).toHaveURL(/#0_s-1$/);

    await dialog.getByRole("button", { name: "閉じる" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page).toHaveURL(/#0$/);
  });

  test("セッション ID 付きの URL で詳細ダイアログが開く", async ({ page }) => {
    await page.goto("/#0_s-2");
    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("heading", { name: "テストセッション2" })).toBeVisible();
    await expect(dialog.getByText("サンプル市役所")).toBeVisible();
  });

  test("カテゴリの選択肢が空のセッションがあってもページが表示される", async ({ page }) => {
    // Sessionize では、カテゴリの値が未選択だと categoryItems が空配列になる
    await page.goto("/#1");
    await expect(page.getByText("種別未設定のセッション")).toBeVisible();
    await expect(page.getByText("二日目のセッション")).toBeVisible();

    await page.getByText("種別未設定のセッション").click();
    const dialog = page.getByRole("dialog", { name: "種別未設定のセッション" });
    await expect(dialog.getByText("種別がまだ決まっていないセッションです。")).toBeVisible();
    // 値のないカテゴリはラベルを出さない
    await expect(dialog.getByText(/録画:/)).toHaveCount(0);
  });

  test("サービスセッションはクリックできない", async ({ page }) => {
    await page.goto("/#1");
    await page.getByText("休憩").click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
});

test("Sessionize API がエラーのときはエラーメッセージを表示する", async ({ page }) => {
  await mockSessionize(page, { failWith: 500 });
  await page.goto("/");
  await expect(page.getByText(/Error occurred by getting Sessionize data/).first()).toBeVisible();
});
