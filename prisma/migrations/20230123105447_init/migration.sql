-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColorSwatch" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "isSelected" BOOLEAN NOT NULL,

    CONSTRAINT "ColorSwatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "retailPrice" TEXT NOT NULL,
    "isOneSize" BOOLEAN NOT NULL,
    "isDiscount" BOOLEAN NOT NULL,
    "isFavorite" BOOLEAN NOT NULL,
    "isWishList" BOOLEAN NOT NULL,
    "isNewArrival" BOOLEAN NOT NULL,
    "isBestSeller" BOOLEAN NOT NULL,
    "isPreOrder" BOOLEAN NOT NULL,
    "isWeddingShop" BOOLEAN NOT NULL,
    "isBeautyProduct" BOOLEAN NOT NULL,
    "isOOS" BOOLEAN NOT NULL,
    "color" BOOLEAN NOT NULL,
    "imageURLs" TEXT[],
    "mobileImageURLs" TEXT[],
    "pdpURL" TEXT NOT NULL,
    "isFinalSale" BOOLEAN NOT NULL,
    "readyDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstReadyDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "markdownDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upcomingMarkdownDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "markdownPrice" TEXT NOT NULL,
    "showMarkdownPrice" BOOLEAN NOT NULL,
    "inventoryLevel" INTEGER NOT NULL,
    "sizePopularity" INTEGER NOT NULL,
    "bagSizeString" TEXT NOT NULL,
    "isCollection" BOOLEAN NOT NULL,
    "firstNonEmptyCategory" TEXT NOT NULL,
    "isSizePreSelect" BOOLEAN NOT NULL,
    "hoverView" BOOLEAN NOT NULL,
    "isModelView" BOOLEAN NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ColorSwatch" ADD CONSTRAINT "ColorSwatch_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
