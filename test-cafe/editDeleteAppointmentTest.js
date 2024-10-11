import { Selector } from "testcafe";

fixture`Edit Delete appt`;

test.page`http://localhost:3000`("test1", async (t) => {
  const dropdown = Selector("#profile-dropdown");
  const myAppointmentsOption = Selector("li").withText("My appointments");
  const signOutOption = Selector("li").withText("Sign out");

  const deleteAppointment = Selector("#delete-appointment-0");
  const deleteTreatment = Selector("#delete-treatment-1");

  await t.wait(2000);

  await t.typeText(Selector("#sign-in-username-input"), "welcome").wait(2000);
  await t.typeText(Selector("#sign-in-password-input"), "mzm9tpj6ECK_avp*txg");
  await t.click(Selector("#submit-sign-in-button")).wait(2000);
  await t
    .click(dropdown)
    .expect(myAppointmentsOption.exists)
    .ok("My appointments option is visible");

  await t.click(myAppointmentsOption);
  await t.wait(2000);
  await t.click(Selector("#appointment-edit-switch"));
  await t
    .expect(deleteTreatment.exists)
    .ok("Delete treatment button is visible");
  await t.click(deleteTreatment);
  await t
    .expect(deleteAppointment.exists)
    .ok("Delete appointment button is visible");
  await t.click(deleteAppointment);

  await t.debug();

  await t
    .click(dropdown)
    .expect(signOutOption.exists)
    .ok("My appointments option is visible");

  await t.click(signOutOption);
});
