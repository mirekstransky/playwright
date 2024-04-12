const { expect } = require("@playwright/test");

exports.MainPage = class MainPage {
  /**

   * @param {import('@playwright/test').Page} page

   */
  constructor(page) {
    this.page = page;
  }

  async otevritWebKB(test) {
    await test.step("Načtení stránky KB", async () => {
      await this.page.goto(process.env.BASE_URL);
    });
    await test.step("Odmítnutí cookies stránky KB", async () => {
      const innerText = await this.page.getByRole("button").allInnerTexts();
      //Kontrola textu tlačítka
      const textButton = "Přijmout vše";
      expect(innerText).toContain(textButton);
      await this.page.getByRole("button", { name: textButton }).click();
    });
  }
};
