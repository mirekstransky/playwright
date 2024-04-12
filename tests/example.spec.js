// @ts-check
const { test, expect } = require("@playwright/test");
const {
  FormSchuzkaPobocka,
} = require("../support/pom/1-step-form-schuzka-na-pobocce");
const {
  FormSchuzkaAdresa,
} = require("../support/pom/2-step-form-schuzka-na-pobocce");
const { MainPage } = require("../support/pom/0-step-main-page");

test.describe("Test webu KB", () => {
  test("Vyplnění formuláře", async ({ page }) => {
    // test.info().annotations.push({
    //   type: "KB",
    //   description: "www.kb.cz",
    // });

    await test.step("Krok 1", async () => {
      const schuzkaForm = new FormSchuzkaPobocka(page);
      const hlavniStrana = new MainPage(page);

      await hlavniStrana.otevritWebKB(test);
      await schuzkaForm.otevritFormular(test);
      await schuzkaForm.vylnitForm(
        test,
        process.env.USER_NAME,
        process.env.USER_MOBILE,
        process.env.USER_EMAIL
      );
      const schuzkaAdresa = new FormSchuzkaAdresa(page);
      await schuzkaAdresa.zadejAdresu(test, "Nymburk");
    });
  });
});
