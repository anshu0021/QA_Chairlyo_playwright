import { test, expect } from '../fixtures/hybrid.fixture';

test.describe('Hybrid Branch Automation', () => {
  test('creates and deletes a branch through the UI', async ({
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

      await branchPage.deleteBranch(branchData.slug);
      branchCreated = false;
      await branchPage.verifyBranchRemoved(branchData.slug);
    } finally {
      if (branchCreated && (await branchPage.getRow(branchData.slug).count()) > 0) {
        await branchPage.deleteBranch(branchData.slug);
        await branchPage.verifyBranchRemoved(branchData.slug);
      }
    }
  });
});