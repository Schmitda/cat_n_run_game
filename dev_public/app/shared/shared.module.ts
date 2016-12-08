import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
@NgModule({
    imports: [CommonModule, ReactiveFormsModule, FormsModule ],
    declarations: [],
    exports:[CommonModule, FormsModule],

})

export class SharedModule{}