import React from "react";

type DeleteButtonProps = {
    text: string,
    callback: () => void,
}

export function DeleteButton(props: DeleteButtonProps) {
    return (
        <input type="button" className="btn btn-primary" value={props.text} onClick={props.callback}/>
    );
}
