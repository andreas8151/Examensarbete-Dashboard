import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = params;

    if (!productId) {
      return NextResponse.json({ status: 400, body: { error: "No ID" } });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json({
        status: 404,
        body: { error: "Product not found" },
      });
    }

    const res = await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return NextResponse.json({
      status: 200,
      body: { message: "Product deleted successfully" },
    });
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}

/* ------------------------------ */

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = params;

    if (!productId) {
      return NextResponse.json({ status: 400, body: { error: "No ID" } });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json({
        status: 404,
        body: { error: "Product not found" },
      });
    }

    const { name, img, description, price, category } = await req.json();

    if (!name || !img || !description || !price || !category) {
      return NextResponse.json({
        status: 400,
        body: { error: "Missing required fields" },
      });
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        img,
        description,
        price,
        category,
      },
    });

    return NextResponse.json({
      status: 200,
      body: {
        message: "Product updated successfully",
        product: updatedProduct,
      },
    });
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}

/* ------------------------------ */

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = params;

    if (!productId) {
      return NextResponse.json({ status: 400, body: { error: "No ID" } });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json({
        status: 404,
        body: { error: "Product not found" },
      });
    }

    return NextResponse.json({
      status: 200,
      body: { product },
    });
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}
