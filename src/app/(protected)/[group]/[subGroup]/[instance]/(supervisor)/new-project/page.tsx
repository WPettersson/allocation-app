import { Stage } from "@prisma/client";

import { Heading } from "@/components/heading";
import { Unauthorised } from "@/components/unauthorised";

import { api } from "@/lib/trpc/server";
import { makeRequiredFlags } from "@/lib/utils/general/make-required-flags";
import { stageGt } from "@/lib/utils/permissions/stage-check";
import { InstanceParams } from "@/lib/validations/params";

import { CreateProjectForm } from "./_components/create-project-form";

export default async function Page({ params }: { params: InstanceParams }) {
  const formDetails = await api.project.getFormDetails({ params });

  const stage = await api.institution.instance.currentStage({ params });

  if (stageGt(stage, Stage.PROJECT_SELECTION)) {
    return (
      <Unauthorised message="You really should not be submitting projects at this stage" />
    );
  }

  const supervisor = await api.user.get();

  const instanceFlags = await api.institution.instance.getFlags({ params });
  const requiredFlags = makeRequiredFlags(instanceFlags);

  return (
    <div className="w-full max-w-5xl">
      <Heading>New Project</Heading>
      <div className="mx-10">
        <CreateProjectForm
          formInternalData={formDetails}
          supervisor={supervisor}
          requiredFlags={requiredFlags}
        />
      </div>
    </div>
  );
}
