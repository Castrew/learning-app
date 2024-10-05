import { Selector } from "testcafe";

fixture`Set appt`;

test.page`http://localhost:3000`("test1", async (t) => {
  await t.typeText(Selector("#sign-in-username-input"), "sexfactor");
  await t.typeText(Selector("#sign-in-password-input"), "mzm9tpj6ECK_avp*txg");
  await t.click(Selector("#submit-sign-in-button")).wait(2000);

  await t.click(Selector("#navbar-appointment-button"));

  await t.click(Selector("#member-0"));

  await t.wait(1000);

  await t.click(Selector("#treatment-0"));
  await t.click(Selector("#next-week-button"));
  await t.click(Selector("#Monday"));

  await t.wait(1000);

  await t.click(Selector("#time-button").withText("11:30"));

  await t.click("#appointment-confirmation-modal");

  await t.expect("#submit-appointment-button").ok();

  await t.click(Selector("#submit-appointment-button"));

  await t.wait(2000);

  await t.expect("#success-toast").ok();

  console.log("brao na momćeto");

  await t.debug();
});
