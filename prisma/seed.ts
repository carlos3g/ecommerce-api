/* eslint-disable no-console */
import { PrismaClient, Category } from '@prisma/client';
import * as bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function createCategories() {
  const eletronicos = await prisma.category.create({ data: { name: 'Eletronicos' } });
  const celulares = await prisma.category.create({ data: { name: 'Celulares' } });
  const eletrodomesticos = await prisma.category.create({ data: { name: 'Eletrodomesticos' } });
  const limpeza = await prisma.category.create({ data: { name: 'Limpeza' } });
  const computadores = await prisma.category.create({ data: { name: 'Computadores' } });
  const roupas = await prisma.category.create({ data: { name: 'Roupas' } });
  const bebidas = await prisma.category.create({ data: { name: 'Bebidas' } });

  return { eletronicos, celulares, eletrodomesticos, limpeza, computadores, roupas, bebidas };
}

async function createProducts(categoriesObj: { [key: string]: Category }) {
  await prisma.product.create({
    data: {
      name: 'Samsumg S22 Ultra',
      price: 5500,
      stock: 18,
      description: 'Venha ser um discipulo de Samsumg',
      categories: {
        create: [
          {
            category_id: categoriesObj.celulares.id,
          },
          {
            category_id: categoriesObj.eletronicos.id,
          },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'IPhone 14',
      price: 7200,
      stock: 10,
      description: 'Venha ser um discipulo de Iphone',
      categories: {
        create: [
          {
            category_id: categoriesObj.celulares.id,
          },
          {
            category_id: categoriesObj.eletronicos.id,
          },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Xiaomi mi 13',
      price: 5000,
      stock: 20,
      description: 'Venha ser um discipulo de Xiaomi',
      categories: {
        create: [
          {
            category_id: categoriesObj.celulares.id,
          },
          {
            category_id: categoriesObj.eletronicos.id,
          },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Air Fryer',
      price: 1000,
      stock: 30,
      description: 'Venha ser um discipulo de Air Fryer',
      categories: {
        create: [
          {
            category_id: categoriesObj.eletrodomesticos.id,
          },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Processador i5',
      price: 800,
      stock: 30,
      description: 'Venha ser um discipulo de Intel',
      categories: {
        create: [
          {
            category_id: categoriesObj.eletronicos.id,
          },
          {
            category_id: categoriesObj.computadores.id,
          },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Ryzen 3',
      price: 800,
      stock: 20,
      description: 'Venha ser um discipulo de AMD',
      categories: {
        create: [
          {
            category_id: categoriesObj.eletronicos.id,
          },
          {
            category_id: categoriesObj.computadores.id,
          },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Alexa',
      price: 400,
      stock: 40,
      description: 'Venha ser um discipulo de Alexa',
      categories: {
        create: [
          {
            category_id: categoriesObj.eletronicos.id,
          },
          {
            category_id: categoriesObj.eletrodomesticos.id,
          },
        ],
      },
    },
  });
}

async function createUsers() {
  await prisma.user.create({
    data: {
      email: 'user01@gmail.com',
      password: await bcryptjs.hash('password', 8),
      name: 'User 01',
      cpf: '12345678901',
    },
  });

  await prisma.user.create({
    data: {
      email: 'user02@gmail.com',
      password: await bcryptjs.hash('password', 8),
      name: 'User 02',
      cpf: '12345678902',
    },
  });

  await prisma.user.create({
    data: {
      email: 'user03@gmail.com',
      password: await bcryptjs.hash('password', 8),
      name: 'User 03',
      cpf: '12345678903',
    },
  });

  await prisma.user.create({
    data: {
      email: 'user04@gmail.com',
      password: await bcryptjs.hash('password', 8),
      name: 'User 04',
      cpf: '12345678904',
    },
  });
}

async function main() {
  await createUsers();
  const categoriesObj = await createCategories();
  await createProducts(categoriesObj);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
