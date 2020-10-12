export interface IListitem{
name:string,
price:string,
description:string,
image:string
}

export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}