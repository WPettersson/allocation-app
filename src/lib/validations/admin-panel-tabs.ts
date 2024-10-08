import { Stage } from "@prisma/client";

export const adminPanelTabs = {
  addSupervisors: {
    title: "Add Supervisors",
    href: "add-supervisors",
    action: false,
  },
  addStudents: {
    title: "Add Students",
    href: "add-students",
    action: false,
  },
  supervisorInvites: {
    title: "Supervisor Invites",
    href: "supervisor-invites",
    action: false,
  },
  projectSubmissions: {
    title: "Project Submissions",
    href: "project-submissions",
    action: false,
  },
  studentInvites: {
    title: "Student Invites",
    href: "student-invites",
    action: false,
  },
  preferenceSubmissions: {
    title: "Preference Submissions",
    href: "preference-submissions",
    action: false,
  },
  lateProposals: {
    title: "Late Proposals",
    href: "late-proposals",
    action: false,
  },
  algorithmsOverview: {
    title: "Algorithms Overview",
    href: "algorithms-overview",
    action: false,
  },
  algorithmDetails: {
    title: "Algorithm Details",
    href: "algorithm-details",
    action: false,
  },
  manualChanges: {
    title: "Manual Changes",
    href: "manual-changes",
    action: false,
  },
  allocationOverview: {
    title: "Allocation Overview",
    href: "allocation-overview",
    action: false,
  },
  forkInstance: {
    title: "Fork Instance",
    href: "fork-instance",
    action: true,
  },
  mergeInstance: {
    title: "Merge Instance",
    href: "merge-instance",
    action: true,
  },
  exportToCSV: {
    title: "Export Data to CSV",
    href: "export-to-csv",
    action: false,
  },
  exportToExternalSystem: {
    title: "Send Data to External System",
    href: "export-to-external-system",
    action: false,
  },
} as const;

export const adminPanelTabsByStage: Record<
  Stage,
  { title: string; href: string; action: boolean }[]
> = {
  SETUP: [adminPanelTabs.addStudents, adminPanelTabs.addSupervisors],
  PROJECT_SUBMISSION: [
    adminPanelTabs.supervisorInvites,
    adminPanelTabs.projectSubmissions,
  ],
  PROJECT_SELECTION: [
    adminPanelTabs.studentInvites,
    adminPanelTabs.preferenceSubmissions,
    adminPanelTabs.lateProposals,
  ],
  PROJECT_ALLOCATION: [
    adminPanelTabs.algorithmsOverview,
    adminPanelTabs.algorithmDetails,
  ],
  ALLOCATION_ADJUSTMENT: [adminPanelTabs.manualChanges],
  ALLOCATION_PUBLICATION: [
    adminPanelTabs.allocationOverview,
    adminPanelTabs.exportToCSV,
    // adminPanelTabs.exportToExternalSystem,
    adminPanelTabs.forkInstance,
    adminPanelTabs.mergeInstance,
  ],
} as const;
