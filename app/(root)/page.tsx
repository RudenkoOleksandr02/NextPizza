import {Container, Filters, ProductsGroupList, Title, TopBar} from "@/components/shared";
import {prisma} from "@/prisma/prisma-client";

export default async function Home() {
    const categories = await prisma.category.findMany({
        include: {
            // Получаем связанные товары (products) для каждой категории
            products: {
                include: {
                    // Включаем связанные элементы товаров (items)
                    items: true,
                    // Включаем связанные ингредиенты товаров (ingredients)
                    ingredients: true
                }
            }
        }
    });

    return <>
        <Container className="mt-10">
            <Title text="Все продукты" size="lg" className="font-extrabold"/>
        </Container>

        <TopBar categories={categories.filter(category => category.products.length > 0)}/>

        <Container className="mt-10 pb-14">
            <div className="flex gap-[80px]">

                {/* Фильтрация */}
                <div className="w-[250px]">
                    <Filters/>
                </div>

                {/* Список товаров */}
                <div className="flex-1">
                    <div className="flex flex-col gap-16">
                        {categories.map(category =>
                            category.products.length > 0 && (
                                <ProductsGroupList key={category.id} title={category.name} categoryId={category.id} items={category.products}/>
                            )
                        )}
                    </div>
                </div>
            </div>
        </Container>
    </>
}
