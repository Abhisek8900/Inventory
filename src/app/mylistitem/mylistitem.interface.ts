export interface IListitem{
id:number
name:string,
price:string,
description:string,
image:string
}

export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}