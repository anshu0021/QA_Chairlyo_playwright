
import { BranchPayload, BranchUpdatePayload } from '../api/types/branch.types';

const generatePhoneNumber = (): string => {
  const randomDigits = Math.floor(Math.random() * 1e7)
    .toString()
    .padStart(7, '0');

  return `+977980${randomDigits}`;
};

export const generateBranchPayload = (): BranchPayload => {
  const suffix = Date.now().toString();

  return {
    name: `Parampara Main Branch ${suffix}`,
    slug: `parampara-main-branch-${suffix}`,
    email: `paramparamain.${suffix}@example.com`,
    phone: generatePhoneNumber(),
    address: 'Shankhamul, Kathmandu, Nepal',
    status: 'active',
    branch_admin: {
      first_name: 'paramparaaa',
      last_name: `pratishtha${suffix}`,
      email: `paramparaaa.${suffix}@example.com`,
      password: 'Admin@123',
      phone: generatePhoneNumber(),
    },
  };
};

export const generateBranchUpdatePayload = (): BranchUpdatePayload => {
  const suffix = Date.now().toString();

  return {
    name: `Parampara Main Branch Updated ${suffix}`,
    email: `parampara.main.branch.updated.${suffix}@example.com`,
    phone: generatePhoneNumber(),
    address: 'Jawalakhel, Lalitpur, Nepal',
    status: 'active',
  };
};