import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sortbar from "./Sortbar";

describe("Sortbar component", () => {
    let title;
    let price;
    let rating;

    beforeEach(() => {
        render(<Sortbar />);
        title = screen.getByText(/title/i);
        price = screen.getByText(/price/i);
        rating = screen.getByText(/rating/i);
    })

    it("renders list of sort options", () => {
        expect(title).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(rating).toBeInTheDocument();
    });

    it("sets option to active when clicked", async () => {
        const user = userEvent.setup();

        await user.click(title);
        expect(title.className).toBe("list-group-item active")
    });

    it("removes active state when clicked again", async () => {
        const user = userEvent.setup();

        await user.click(title);
        expect(title.className).toBe("list-group-item active")
        
        await user.click(title);
        expect(title.className).toBe("list-group-item")
    });

    it("only lets one option be active at a time", async () => {
        const user = userEvent.setup();

        await user.click(title);
        expect(title.className).toBe("list-group-item active")
        
        await user.click(price);
        expect(title.className).toBe("list-group-item")
        expect(price.className).toBe("list-group-item active")
    });
});
