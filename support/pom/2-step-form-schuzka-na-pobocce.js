const { expect } = require("@playwright/test");

exports.FormSchuzkaAdresa = class FormSchuzkaAdresa {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.adresa = page.getByRole("textbox", { name: "Zadejte adresu" });
  }
  async zadejAdresu(test, adresa) {
    this.page.on("dialog", (dialog) => dialog.accept());
    await this.adresa.fill(adresa);
    await this.page.getByRole("button").last().click();
    const kontrola = this.page
      .locator("h2")
      .filter({ hasText: "Vyberte pobočku" });
    await expect(kontrola).toBeVisible();
    await this.page.getByRole("button").last().click();
  }
};
