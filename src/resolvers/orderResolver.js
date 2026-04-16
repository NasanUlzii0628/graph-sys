const prisma = require("../../prisma/client");

const orderResolver = {
  Mutation: {
    createOrder: async (_, { input }) => {
      const { userId, items } = input

      // 1. total тооцоолох
      let total = 0

      for (const item of items) {
        const product = await prisma.product.findUnique({
          where: { id: item.productId }
        })

        if (!product) throw new Error("Product not found")

        if (product.stock < item.quantity) {
          throw new Error(`Not enough stock for ${product.name}`)
        }

        total += product.price * item.quantity
      }

      // 2. order үүсгэх
      const order = await prisma.order.create({
        data: {
          userId,
          total,
          items: {
            create: items.map(i => ({
              productId: i.productId,
              quantity: i.quantity
            }))
          }
        },
        include: {
          items: true
        }
      })

      // 3. stock update хийх
      for (const item of items) {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        })
      }

      return order
    }
  }
}

module.exports = orderResolver