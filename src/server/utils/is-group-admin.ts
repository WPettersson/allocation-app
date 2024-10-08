import { PrismaTransactionClient } from "@/lib/db";
import { GroupParams } from "@/lib/validations/params";
import { AdminLevel, PrismaClient } from "@prisma/client";

export async function isGroupAdmin(
  db: PrismaClient,
  params: GroupParams,
  userId: string,
) {
  const groupAdmin = await db.adminInSpace.findFirst({
    where: {
      allocationGroupId: params.group,
      allocationSubGroupId: null,
      userId,
    },
    select: { adminLevel: true },
  });

  return (groupAdmin && groupAdmin.adminLevel === AdminLevel.GROUP) ?? false;
}

export async function isAdminInGroup_v2(
  db: PrismaTransactionClient,
  params: GroupParams,
  userId: string,
) {
  const { groupAdmins } = await db.allocationGroup.findFirstOrThrow({
    where: { id: params.group },
    select: { groupAdmins: { select: { userId: true } } },
  });

  return groupAdmins.map((x) => x.userId).includes(userId);
}
