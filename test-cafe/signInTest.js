import { Selector } from "testcafe";

fixture`Sign In`;

test.page`http://localhost:3000`("test1", async (t) => {
  await t.typeText(Selector("#sign-in-username-input"), "welcome");
  await t.typeText(Selector("#sign-in-password-input"), "mzm9tpj6ECK_avp*txg");
  await t.click(Selector("#submit-sign-in-button")).wait(5000);
  console.log("im in ");
});
