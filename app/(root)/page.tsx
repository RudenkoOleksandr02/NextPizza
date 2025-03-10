import {Container, Filters, ProductsGroupList, Stories, Title, TopBar} from "@/components/shared";
import {Suspense} from "react";
import {findPizzas, GetSearchParams} from "@/lib/find-pizzas";

export default async function Home({ searchParams }: { searchParams: Promise<GetSearchParams> }) {
    const params = await searchParams;
    const categories = await findPizzas(params);

    return <>
        <Container className="mt-10">
            <Title text="Всі продукти" size="lg" className="font-extrabold"/>
        </Container>

        <TopBar categories={categories.filter(category => category.products.length > 0)}/>

        <Stories />

        <Container className="mt-10 pb-14">
            <div className="flex gap-[80px]">
                <div className="w-[250px]">
                    <Suspense><Filters/></Suspense>
                </div>

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
