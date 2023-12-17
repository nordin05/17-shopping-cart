import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Item from "./Item";

describe("Sortbar component", () => {
    const product = {"id":1,"title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops","price":109.95,"description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing","image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg","rating":{"rate":3.9,"count":120}}
    const Fn = () => console.log("");

    beforeEach(() => {
        render(<Item product={product} addItemToCart={Fn} removeItemFromCart={Fn}/>);
    })

    it("changes button class when clicked", async () => {
        const user = userEvent.setup();
        
        const btn = screen.getByText(/Add to Cart/i);
        expect(btn.className).toBe("btn btn-primary btn-sm")
        expect(btn.innerHTML).toBe("Add to Cart")

        await user.click(btn);
        expect(btn.className).toBe("btn btn-success btn-sm")
        expect(btn.innerHTML).toBe("Added to Cart")

        await user.click(btn);
        expect(btn.className).toBe("btn btn-primary btn-sm")
        expect(btn.innerHTML).toBe("Add to Cart")
    });
});
