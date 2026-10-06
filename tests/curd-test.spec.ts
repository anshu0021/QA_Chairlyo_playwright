import { test, expect } from '../fixtures/branch.fixture';

test('Create, update, and delete a branch through the UI', async ({
  branchPage,
  branchData,
}) => {
  await branchPage.goToBranchList();
  let branchCreated = false;

  try {
    await branchPage.createBranch(branchData);
    branchCreated = true;

    await branchPage.verifyToast('Branch Created', 'The branch has been created successfully.');
    await branchPage.verifyBranchVisible(branchData.slug);
    await branchPage.verifyBranchStatus(branchData.slug, 'Active');

    await branchPage.updateBranchStatus(branchData.slug, 'Inactive');
    await branchPage.verifyToast('Branch Updated', 'The branch has been updated successfully.');
    await branchPage.verifyBranchStatus(branchData.slug, 'Inactive');

    await branchPage.deleteBranch(branchData.slug);
    branchCreated = false;
    await branchPage.verifyBranchRemoved(branchData.slug);
  } finally {
    if (branchCreated && (await branchPage.getRow(branchData.slug).count()) > 0) {
      await branchPage.deleteBranch(branchData.slug);
      await expect(branchPage.getRow(branchData.slug)).toHaveCount(0);
    }
  }
});
