import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sortbar from "./Sortbar";

describe("Sortbar component", () => {

    it("renders list of sort options", () => {
        render(<Sortbar />);
        const title = screen.getByText(/title/i);
        const price = screen.getByText(/price/i);
        const rating = screen.getByText(/rating/i);

        expect(title).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(rating).toBeInTheDocument();
    });

    it("sets option to active when clicked", async () => {
        const user = userEvent.setup();

        render(<Sortbar />);
        const title = screen.getByText(/title/i);

        await user.click(title);
        expect(title.className).toBe("list-group-item active")
    });

    it("removes active state when clicked again", async () => {
        const user = userEvent.setup();

        render(<Sortbar />);
        const title = screen.getByText(/title/i);

        await user.click(title);
        expect(title.className).toBe("list-group-item active")
        
        await user.click(title);
        expect(title.className).toBe("list-group-item")
    });

    it("only lets one option be active at a time", async () => {
        const user = userEvent.setup();

        render(<Sortbar />);
        const title = screen.getByText(/title/i);
        const price = screen.getByText(/price/i);

        await user.click(title);
        expect(title.className).toBe("list-group-item active")
        
        await user.click(price);
        expect(title.className).toBe("list-group-item")
        expect(price.className).toBe("list-group-item active")
    });
});
