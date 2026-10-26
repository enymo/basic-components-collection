import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { sleep } from "../storybook";
import { AutoCompleteInput } from "./AutoCompleteInput";

const meta = {
    component: AutoCompleteInput,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof AutoCompleteInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        className: "w-60",
        label: "Lorem ipsum",
        value: null,
        placeholder: "Bitte wählen",
        searchPlaceholder: "Suche...",
        searchLabel: "Zum Suchen tippen",
        searchingLabel: "Suchen...",
        noResultsLabel: "Keine Ergebnisse gefunden",
        onSearch: async (search) => {
            await sleep(2000);
            return [{
                value: "something",
                label: "Something else"
            }, {
                value: "dolor",
                label: "dolor sit amet"
            }, {
                value: "lorem",
                label: "Lorem ipsum"
            }].filter(({label}) => label.toLowerCase().startsWith(search.toLowerCase()));
        }
    },
    render: args => {
        const [value, setValue] = useState(args.value);

        return (
            <AutoCompleteInput
                {...args}
                value={value}
                onChange={setValue}
            />
        )
    }
}