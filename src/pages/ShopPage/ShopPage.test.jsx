import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShopPage from "./ShopPage";

describe("Shopping page", () => {
    const product1 = {"id":1,"title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops","price":109.95,"description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing","image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg","rating":{"rate":3.9,"count":120}}
    const product2 = {"id":20,"title":"DANVOUY Womens T Shirt Casual Cotton Short","price":12.99,"description":"95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.","category":"women's clothing","image":"https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg","rating":{"rate":3.6,"count":145}}
    const product3 = {"id":8,"title":"Pierced Owl Rose Gold Plated Stainless Steel Double","price":10.99,"description":"Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel","category":"jewelery","image":"https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg","rating":{"rate":1.9,"count":100}}
    const product4 = {"id":12,"title":"WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive","price":114,"description":"Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty","category":"electronics","image":"https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg","rating":{"rate":4.8,"count":400}}
    const Products = [product1, product2, product3, product4];

    let mensClothingBtn;
    let womensClothingBtn;
    let titleBtn;
    let priceBtn


    beforeEach(() => {
        render(
            <BrowserRouter>
              <ShopPage Products={Products}/>
            </BrowserRouter>
        );

        mensClothingBtn = screen.getByText("Men's Clothing");
        womensClothingBtn = screen.getByText("Women's Clothing");
        titleBtn = screen.getByText("Title");
        priceBtn = screen.getByText("Price");
    })

    it("Filters by category", async () => {
        const user = userEvent.setup();
        
        await user.click(mensClothingBtn);
        const product1 = screen.getByText(/Fjallraven - Foldsack/i);
        let productsAmount = screen.getAllByText(/Add to Cart/i).length
        expect(product1).toBeInTheDocument()
        expect(productsAmount).toBe(1)

        await user.click(womensClothingBtn);
        const product2 = screen.getByText(/DANVOUY Womens/i);
        expect(product1).not.toBeInTheDocument()
        expect(product2).toBeInTheDocument()

        await user.click(womensClothingBtn);
        productsAmount = screen.getAllByText(/Add to Cart/i).length
        expect(productsAmount).toBe(4)
    });

    it("Filters by rating", async () => {
        const user = userEvent.setup();
        const product1 = screen.getByText(/Fjallraven - Foldsack/i);
        const product2 = screen.getByText(/DANVOUY Womens/i);
        const product3 = screen.getByText(/Pierced Owl Rose/i);

        await user.click(titleBtn);
        expect(product1.compareDocumentPosition(product2)).toBe(2); 

        await user.click(priceBtn);
        expect(product2.compareDocumentPosition(product3)).toBe(2); 
    });

    it("Adds and removes items from cart", async () => {
        const user = userEvent.setup();
        const buttons = screen.getAllByText("Add to Cart");
        const numberOfItems = screen.getByTestId("cart-item-num");
        expect(numberOfItems.innerHTML).toBe("0"); 

        await user.click(buttons[0]);
        expect(numberOfItems.innerHTML).toBe("1"); 

        await user.click(buttons[1]);
        expect(numberOfItems.innerHTML).toBe("2");
        
        await user.click(buttons[1]);
        expect(numberOfItems.innerHTML).toBe("1");
    });
});
