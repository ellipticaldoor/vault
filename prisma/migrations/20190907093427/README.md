# Migration `20190907093427`

This migration has been generated by Miguel Dorta at 9/7/2019, 9:34:27 AM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "development"."User"("createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,"id" text NOT NULL  ,"password" text NOT NULL DEFAULT '' ,"username" text NOT NULL DEFAULT '' ,PRIMARY KEY ("id"))
;

CREATE TABLE "development"."Vault"("createdAtTick" integer NOT NULL DEFAULT 0 ,"facilityId" text NOT NULL DEFAULT '' ,"id" text NOT NULL  ,"resourceId" text NOT NULL DEFAULT '' ,"userId" text   ,"x" integer NOT NULL DEFAULT 0 ,"y" integer NOT NULL DEFAULT 0 ,PRIMARY KEY ("id"))
;

CREATE UNIQUE INDEX "User.username" ON "development"."User"("username")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration ..20190907093427
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,26 @@
+datasource db {
+  provider = "postgresql"
+  url = env("POSTGRES_URL")
+}
+
+generator photonjs {
+  provider = "photonjs"
+  output = "../src/photon"
+}
+
+model User {
+  id String @id @default(uuid())
+  createdAt DateTime @default(now())
+  username String @unique
+  password String
+}
+
+model Vault {
+  id String @id @default(uuid())
+  createdAtTick Int
+  x Int
+  y Int
+  userId String?
+  resourceId String
+  facilityId String
+}
```

## Photon Usage

You can use a specific Photon built for this migration (20190907093427)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20190907093427';

const photon = new Photon();

async function main() {
  const result = await photon.users();
  console.dir(result, { depth: null });
}

main();
```
