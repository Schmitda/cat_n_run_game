export class Modal{
    protected isVisible: boolean = false;

    public show(){
        this.isVisible = true;
    }

    public hide(){
        this.isVisible = false;
    }

}