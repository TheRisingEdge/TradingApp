import React from "react";

export type SearchBoxProps = {
    name: string,
    onSubmit: (text: string) => void;
}

export function SearchBox(props: SearchBoxProps) {
    return (
        <div>
            This is a SearchBox
        </div>
    );
}
