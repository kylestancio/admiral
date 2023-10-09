-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('INACTIVE', 'WAITINGCONFIRMATION', 'ACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPERUSER', 'USER', 'USERMANAGER', 'ACCOUNTSMANAGER');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('GENERAL', 'JEEPNEY', 'TAXI', 'MOTORCYCLE', 'TRICYCLE', 'OTHERS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "status" "UserStatus" DEFAULT 'WAITINGCONFIRMATION',
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "position" TEXT NOT NULL,
    "roles" "UserRole"[] DEFAULT ARRAY['USER']::"UserRole"[],
    "avatarLink" TEXT,
    "birthday" TIMESTAMP(3) NOT NULL,
    "employmentDate" TIMESTAMP(3) NOT NULL,
    "extendedDetails" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "avatarLink" TEXT,
    "licenseCode" TEXT NOT NULL,
    "licenseImageLink" TEXT NOT NULL,
    "licenseExpiry" TIMESTAMP(3) NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "employmentDate" TIMESTAMP(3) NOT NULL,
    "extendedDetails" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "type" "VehicleType" NOT NULL DEFAULT 'GENERAL',
    "name" TEXT,
    "code" TEXT NOT NULL,
    "plateNumber" TEXT NOT NULL,
    "garageGeoJSON" JSONB,
    "lastMaintenanceDate" TIMESTAMP(3),
    "nextMaintenanceDate" TIMESTAMP(3),
    "trackerFitted" BOOLEAN NOT NULL,
    "fuelConsumptionPerLitter" DOUBLE PRECISION NOT NULL,
    "fleetId" TEXT,
    "imageLinks" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fleet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "incomingRouteId" TEXT,
    "outgoingRouteId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fleet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "originPlace" TEXT NOT NULL,
    "destinationPlace" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_username_key" ON "Driver"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_email_key" ON "Driver"("email");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_fleetId_fkey" FOREIGN KEY ("fleetId") REFERENCES "Fleet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fleet" ADD CONSTRAINT "Fleet_incomingRouteId_fkey" FOREIGN KEY ("incomingRouteId") REFERENCES "Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fleet" ADD CONSTRAINT "Fleet_outgoingRouteId_fkey" FOREIGN KEY ("outgoingRouteId") REFERENCES "Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;
