const { expect } = require("@playwright/test");

exports.FormSchuzkaPobocka = class FormSchuzkaPobocka {
  /**

   * @param {import('@playwright/test').Page} page

   */
  constructor(page) {
    this.page = page;
    this.inputNameSurname = page
      .locator("div")
      .filter({ hasText: "Jméno a příjmení" })
      .last()
      .getByRole("textbox");

    this.inputMobile = page
      .locator("div")
      .filter({ hasText: "Mobil" })
      .getByRole("textbox", { name: "Telefonní číslo" });

    this.inputEmail = page
      .locator("div")
      .filter({ hasText: "E-mail" })
      .last()
      .getByRole("textbox");
    this.buttonName = page.getByRole("button", { name: "Pokračovat" });
  }

  async otevritFormular(test) {
    await test.step("Proklik na stát se klientem", async () => {
      const linkKlient = await this.page.getByRole("link").allInnerTexts();
      const textLink = "Stát se klientem";
      expect(linkKlient).toContain(textLink);
      await this.page.getByRole("link", { name: textLink }).click();
    });

    await test.step("Proklik na test form -> Vybrat pobočku", async () => {
      await this.page
        .locator("div")
        .filter({ hasText: "Vybrat pobočku" })
        .last()
        .click();
    });
  }

  async vylnitForm(test, inputNameSurname, inputMobile, inputEmail) {
    await test.step("Vyplnění jména na form KB a test vyplnění pole", async () => {
      await this.inputNameSurname.fill(inputNameSurname);
      const check = await this.inputNameSurname.inputValue();
      expect(check).toEqual(inputNameSurname);
    });

    await test.step("Vyplnění mobilu na form KB a test vyplnění pole", async () => {
      await this.inputMobile.fill(inputMobile);
      var check = await this.inputMobile.inputValue();
      check = check.split(" ").join("");
      expect(check).toEqual(inputMobile);
    });

    await test.step("Vyplnění jména na form KB a test vyplnění pole", async () => {
      await this.inputEmail.fill(inputEmail);
      const check = await this.inputEmail.inputValue();
      expect(check).toEqual(inputEmail);
    });

    await test.step("Stisknutí tlačítka", async () => {
      await expect(this.buttonName).toBeVisible();
      await this.buttonName.click();
    });
  }
};
