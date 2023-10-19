import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, img, description, price, category } = await req.json();

  try {
    const res = await prisma.product.create({
      data: {
        name,
        img,
        description,
        price,
        category,
      },
    });

    return NextResponse.json({ status: 201, body: { res } });
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}

/* ------------------------------ */

export async function GET() {
  try {
    const res = await prisma.product.findMany();

    return NextResponse.json({ status: 200, body: { res } });
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}
