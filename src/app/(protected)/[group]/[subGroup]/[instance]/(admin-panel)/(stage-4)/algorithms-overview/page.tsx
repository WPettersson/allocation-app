import { SubHeading } from "@/components/heading";

import {
  GenerousAlgorithm,
  GreedyAlgorithm,
  GreedyGenAlgorithm,
  MinCostAlgorithm,
} from "@/lib/algorithms";
import { api } from "@/lib/trpc/server";
import { InstanceParams } from "@/lib/validations/params";

import {
  NewAlgorithmButton,
  ResultsTable,
  RunAlgorithmButton,
} from "./_components";

export default async function Page({ params }: { params: InstanceParams }) {
  const { matchingData, selectedAlgName } =
    await api.institution.instance.matching.data({ params });

  const takenNames = await api.institution.instance.algorithm.takenNames({
    params,
  });

  const customAlgs = await api.institution.instance.algorithm.customAlgs({
    params,
  });

  return (
    <div className="mt-20 flex flex-col items-center">
      <div className="flex min-w-[50%] flex-col gap-3">
        <SubHeading className="mb-6 text-2xl">
          Select Algorithms to run
        </SubHeading>
        <div className="flex w-[45rem] flex-col gap-5">
          <RunAlgorithmButton
            matchingData={matchingData}
            algorithm={GenerousAlgorithm}
          />
          <RunAlgorithmButton
            matchingData={matchingData}
            algorithm={GreedyAlgorithm}
          />
          <RunAlgorithmButton
            matchingData={matchingData}
            algorithm={GreedyGenAlgorithm}
          />
          <RunAlgorithmButton
            matchingData={matchingData}
            algorithm={MinCostAlgorithm}
          />
          {customAlgs.map((alg, i) => (
            // TODO: add ability to delete custom algorithms
            <RunAlgorithmButton
              key={i}
              matchingData={matchingData}
              algorithm={alg}
              custom
            />
          ))}
          <NewAlgorithmButton takenNames={takenNames} />
          <h2 className="mb-6 mt-16 text-2xl font-semibold">Results Summary</h2>
          <ResultsTable
            selectedAlgName={selectedAlgName}
            customAlgs={customAlgs}
          />
        </div>
      </div>
    </div>
  );
}
