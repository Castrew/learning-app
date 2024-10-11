import { Selector } from "testcafe";

fixture`Set appt`;

test.page`http://localhost:3000`("test1", async (t) => {
  const dropdown = Selector("#profile-dropdown");
  const signOutOption = Selector("li").withText("Sign out");

  await t.wait(2000);

  await t.typeText(Selector("#sign-in-username-input"), "welcome").wait(2000);
  await t.typeText(Selector("#sign-in-password-input"), "mzm9tpj6ECK_avp*txg");
  await t.click(Selector("#submit-sign-in-button")).wait(2000);

  await t.click(Selector("#navbar-appointment-button"));

  await t.click(Selector("#member-0"));

  await t.wait(1000);

  await t.click(Selector("#treatment-col1-0"));
  await t.click(Selector("#treatment-col1-1"));
  await t.click(Selector("#treatment-col2-0"));
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

  await t
    .click(dropdown)
    .expect(signOutOption.exists)
    .ok("My appointments option is visible");

  await t.click(signOutOption);
  await t.wait(2000);
});
