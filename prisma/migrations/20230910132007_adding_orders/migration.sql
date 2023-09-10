-- CreateTable
CREATE TABLE "Order" (
    "email" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_email_key" ON "Order"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Order_sessionId_key" ON "Order"("sessionId");
