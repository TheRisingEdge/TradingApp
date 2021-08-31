import React from "react";

type DeleteButtonProps = {
    callback: () => void,
}

export function DeleteButton(props: DeleteButtonProps) {
    return (
        <input type="button" value="Delete" onClick={props.callback}/>
    );
}
