import { FormGroup } from "@angular/forms";
import { LoaderService } from "src/app/shared/loader/loader.service";

export function initForm(form: FormGroup, title: string | null, sets: number | null, repetitions: string | null) {
    form.setValue({
        title,
        sets,
        repetitions
    });

    form.disable();
}

export function resetForm(form: FormGroup, title: string | null, sets: number | null, repetitions: string | null) {
    form.reset({
        title,
        sets,
        repetitions
    });

    form.disable();
}

export function disableAndHideLoader(form: FormGroup, loaderService: LoaderService) {
    form.disable();
    loaderService.setLoadingState(false);
}