





export class BranchPage {
}

private async selectStatus(status: 'Active' | 'Inactive') {
  await branchFormLocators(this.page).statusDropdown.click();
  await statusOption(this.page, status).click();
}

private async fillBranchDetails(data: {
  name: string;
  phone: string;
  email: string;
  address: string;
  status: 'Active' | 'Inactive';
  slug?: string;
}) {
  const form = branchFormLocators(this.page);

  await form.nameInput.fill(data.name);
  if (data.slug) {
    await form.slugInput.fill(data.slug);
  }
  await this.fillPhoneNumber(form.phoneInput, data.phone);
  await form.emailInput.fill(data.email);
  await form.addressInput.fill(data.address);
  await this.selectStatus(data.status);
}

private async fillBranchAdminDetails(admin: BranchData['admin']) {
  const adminForm = branchAdminFormLocators(this.page);

  await adminForm.firstNameInput.fill(admin.firstName);
  await adminForm.lastNameInput.fill(admin.lastName);
  await adminForm.emailInput.fill(admin.email);
}
