import React from "react";

type DeleteButtonProps = {
    text: string,
    callback: () => void,
}

export function DeleteButton(props: DeleteButtonProps) {
    return (
        <input type="button" value={props.text} onClick={props.callback}/>
    );
}
