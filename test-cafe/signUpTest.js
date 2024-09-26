import { Selector } from "testcafe";

fixture`sign-up`;

test.page`http://localhost:3000`("test1", async (t) => {
  await t.click(Selector("#sign-up-page-button"));
  await t.typeText(Selector("#sign-up-username-input"), "sexfactor");
  await t.typeText(Selector("#sign-up-password-input"), "mzm9tpj6ECK_avp*txg");
  await t.typeText(
    Selector("#sign-up-confirmPassword-input"),
    "mzm9tpj6ECK_avp*txg"
  );
  await t.click(Selector("#submit-sign-up-button")).wait(5000);
  console.log("im in ");
});
