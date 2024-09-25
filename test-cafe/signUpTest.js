import { Selector } from "testcafe";

fixture`sign-up`;

test.page`http://localhost:3000`("test1", async (t) => {
  await t.click(Selector("#sign-up-page-button"));
  await t.typeText(Selector("#sign-up-username-input"), "bbbbb");
  await t.typeText(Selector("#sign-up-password-input"), "aaaaaaaa");
  await t.typeText(Selector("#sign-up-confirmPassword-input"), "aaaaaaaa");
  await t.click(Selector("#submit-sign-up-button")).wait(5000);
  console.log("im in ");
});
