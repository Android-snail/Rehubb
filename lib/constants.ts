export const DEFAULT_CREDENTIALS = {
  user: {
    name: "John Doe",
    email: "user@example.com",
    password: "password",
    role: "user",
  },
  admin: {
    name: "Admin User",
    email: "admin@example.com",
    password: "password",
    role: "admin",
  },
}

export const PROPOSAL_STATUS = {
  DRAFT: "draft",
  SUBMITTED: "submitted",
  INITIAL_SCREENING: "initial_screening",
  APPROVED_FOR_REVIEW: "approved_for_review",
  DISAPPROVED: "disapproved",
  IN_HOUSE_REVIEW: "in_house_review",
  ETHICS_REVIEW: "ethics_review",
  REVISION_REQUIRED: "revision_required",
  FINAL_REVISION: "final_revision",
  RESUBMITTED: "resubmitted",
  NTP_ISSUED: "ntp_issued",
  CLEARANCE_REQUIRED: "clearance_required",
  CLEARANCE_SUBMITTED: "clearance_submitted",
  COMPLETED: "completed",
}

