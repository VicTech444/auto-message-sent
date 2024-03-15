const $ = (selector: string) => document.querySelector(selector);

const $dateNow = $(`#date-now`) as HTMLSpanElement;
const $emailList = $(`.email-list`) as HTMLDivElement;
const $emptyContainer = $(`.empty-container`) as HTMLDivElement;
const $containerWithInfo = $(`.container-with-info`) as HTMLDivElement;
const $emailName = $(`.email-name-container`) as HTMLDivElement;
const $emailBody = $(`.email-body`) as HTMLDivElement;

const $manualMessage = $(`#manual-message`) as HTMLInputElement;
const $sendManualMessageBtn = $(`#send-manual-message`) as HTMLButtonElement;
const $openProgramMenu = $(`.open-auto-message`) as HTMLDivElement;

const $program = $(`.auto-message-program`) as HTMLDivElement;
const $closeMenu = $(`.closing-menu`) as HTMLDivElement;
const $amountEmails = $(`#amount-emails`) as HTMLElement;
const $selectAllMessages = $(`#all-messages`) as HTMLInputElement;
const $selectPersonalize = $(`#personalize`) as HTMLInputElement;
const $startFromContainer = $(`.start-from`) as HTMLDivElement;
const $endToContainer = $(`.end-to`) as HTMLDivElement;
const $startFrom = $(`#start-from`) as HTMLInputElement;
const $endTo = $(`#end-to`) as HTMLInputElement;
const $autoMessageToSend = $(`#auto-message`) as HTMLTextAreaElement;
const $errorMessage = $(`.error-message`) as HTMLDivElement;
const $acceptAutoMessageBtn = $(`#accept-automessage`) as HTMLButtonElement;

const $confirmAutoMessageContainer = $(`.confirm-automessage`) as HTMLDivElement;
const $startSpan = $(`#start-span`) as HTMLSpanElement;
const $endSpan = $(`#end-span`) as HTMLSpanElement;
const $autoMessageConfirm = $(`#message-to-send-textarea`) as HTMLTextAreaElement;
const $confirmAutoMessageBtn = $(`#confirm-automessage`) as HTMLButtonElement;
const $cancelAutoMessageBtn = $(`#cancel-automessage`) as HTMLButtonElement;

let maxOverflow: number;
let maxUnderFlow: number = 1;
let objectDate = new Date();

$dateNow.innerHTML = objectDate.toLocaleDateString();

interface objectFromApi {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

interface autoMessage {
    start: number;
    end: number;
    text: string;
}

const getInfoFromApi = async (): Promise<objectFromApi[]> => {
    return (await fetch("https://jsonplaceholder.typicode.com/comments")).json();
}

const placeInfoInBothDivs = async (): Promise<void> => {
    let information: objectFromApi[] = await getInfoFromApi();
    let documentFragmentEmail = document.createDocumentFragment();
    let documentFragmentBody = document.createDocumentFragment();

    maxOverflow = information.length;

    $startFrom.setAttribute('min', `${maxUnderFlow}`);
    $startFrom.setAttribute('max', `${maxOverflow}`);
    $endTo.setAttribute('min', `${maxUnderFlow}`);
    $endTo.setAttribute('max', `${maxOverflow}`);

    $amountEmails.innerHTML = `${maxOverflow}`;

    for (let i = 0; i < information.length; i++) {
        let { postId, id, name, email, body }: objectFromApi = information[i];

        let divEmail = document.createElement(`DIV`);
        divEmail.classList.add(`email-${i + 1}`);
        divEmail.innerHTML = `${name}`;

        divEmail.addEventListener(`click`, (ev: any) => {
            if ($containerWithInfo?.classList.contains('hidden')) {
                $containerWithInfo?.classList.remove('hidden');
                $emptyContainer?.classList.add('hidden');
            }

            removeHiddenFromBody(ev);
        })

        let divBody = document.createElement(`DIV`);
        divBody.classList.add(`body`, `email-${i + 1}`, 'hidden');
        divBody.setAttribute("name", `${name}`);
        divBody.innerHTML = `<div class="email-name-container fs-22" id="email-name-${i + 1}">${email}</div>
                             <div class="email-body dp-flex of-auto fd-column" id="body-info-${i + 1}">${body}</div>`;

        documentFragmentEmail.append(divEmail);
        documentFragmentBody.append(divBody);
    }

    $emailList?.append(documentFragmentEmail);
    $containerWithInfo?.append(documentFragmentBody);
}

const removeHiddenFromBody = (ev: any): void => {
    let divToRemoveHidden = ev.target.classList[0];

    if (!$manualMessage?.validity.valueMissing) {
        $manualMessage.value = "";
        $manualMessage.focus()
    }

    if (ev.target?.textContent == $(`.email-showing`)?.getAttribute('name')) {
        toggleClasses($('.email-showing'), 'hidden', 'email-showing');
        $emptyContainer?.classList.remove('hidden');
        $containerWithInfo?.classList.add('hidden');

    } else if ($('.email-showing')) {
        toggleClasses($(`.email-showing`), 'hidden', 'email-showing')
        toggleClasses($(`.container-with-info .${divToRemoveHidden}`), 'email-showing', 'hidden');

    } else {
        toggleClasses($(`.container-with-info .${divToRemoveHidden}`), 'email-showing', 'hidden');
    }
}

const toggleClasses = (selector: Element | null, classToAdd: string, classToRemove: string): void => {
    selector?.classList.add(classToAdd);
    selector?.classList.remove(classToRemove);
}

const autoMessageInputValidation = (): void => {
    if ($startFrom.validity.rangeOverflow ||
        parseInt($startFrom.value) >= (maxOverflow - 1)) {

        $startFrom.value = (maxOverflow - 1).toString();

    } else if ($startFrom.validity.rangeUnderflow ||
        parseInt($startFrom.value) <= 0) {

        $startFrom.value = maxUnderFlow.toString();

    } else if ($startFrom.validity.valueMissing) {
        $startFrom.value = maxUnderFlow.toString();
    }

    givingEndToProperties($startFrom.value);
}
const givingEndToProperties = (value: string) => {
    let correctSumn = parseInt(value);
    correctSumn = correctSumn + 1;

    $endTo.value = correctSumn.toString();
    $endTo.setAttribute('min', `${correctSumn}`);
}

const showError = (error: string) => {
    $errorMessage.innerHTML = `<small>${error}</small>`;

    setTimeout(() => $errorMessage.innerHTML = "", 3000);
}

const validatingThreeFields = (): Promise<true> => {
    return new Promise<true>((resolve, reject) => {
        if (!($startFromContainer.classList.contains('hidden') && $endToContainer.classList.contains('hidden'))) {
            if ($startFrom.validity.valueMissing || $startFrom.value == "") {
                reject(`A value is needed at the start field in order to continue`);

            } else if ($endTo.validity.valueMissing || $endTo.value == "") {
                reject('A value is needed at the end field in order to continue');

            } else if ($autoMessageToSend.validity.valueMissing || $autoMessageToSend.value == "") {
                reject('You need to write a message in order to continue!');

            }

        } else {
            if ($autoMessageToSend.validity.valueMissing || $autoMessageToSend.value == "") {
                reject('You need to write a message in order to continue!');

            }
        }

        resolve(true)
    })
}

const showConfirmAutoMessageInformation = async () => {
    if ($selectAllMessages.checked == true) {
        $startFrom.value = maxUnderFlow.toString();
        $endTo.value = maxOverflow.toString();
    }

    $startSpan.innerHTML = $startFrom.value;
    $endSpan.innerHTML = $endTo.value;
    $autoMessageConfirm.innerHTML = $autoMessageToSend.value;
}

const sendAutoMessageToEmails = async (information: autoMessage): Promise<void> => {
    let allChildrens: HTMLDivElement[] = $(`.container-with-info`)?.children as any as HTMLDivElement[];

    for (let i = (information.start - 1); i <= information.end; i++) {
        let containerWhereAutoMessage = allChildrens[i]?.lastElementChild;

        if (containerWhereAutoMessage != null) {
            containerWhereAutoMessage.innerHTML += `<div class="response">${information.text}</div>`
        }
    }
}

$cancelAutoMessageBtn.addEventListener(`click`, () => $confirmAutoMessageContainer?.classList.add('hidden'));
$openProgramMenu.addEventListener(`click`, () => $program.classList.remove('hidden'));
$closeMenu.addEventListener(`click`, () => $program.classList.add(`hidden`));

$startFrom.addEventListener('click', (ev: any) => {
    if (!$startFrom.validity.valueMissing) $startFrom.value = ev.target?.value;
});

$startFrom.addEventListener('change', (ev: any) => {
    if (!$startFrom.validity.valueMissing) autoMessageInputValidation();
});

$selectAllMessages.addEventListener('change', () => {
    $startFromContainer.classList.add('hidden');
    $endToContainer.classList.add('hidden');
});

$selectPersonalize.addEventListener('change', () => {
    $startFromContainer.classList.remove('hidden');
    $endToContainer.classList.remove('hidden');
});

$startFrom.addEventListener('mouseout', (ev: any) => {
    if (!$startFrom.validity.valueMissing) {
        $startFrom.value = ev.target?.value;
    }
});

$endTo.addEventListener('change', (ev: any) => {
    if ($startFrom.validity.valueMissing) {
        autoMessageInputValidation();

    } else if (ev.target.value > maxOverflow) {
        ev.target.value = maxOverflow;
    }
});

$sendManualMessageBtn?.addEventListener(`click`, (ev) => {
    if ($manualMessage.value) {
        let containerWhereText = $(`.email-showing`)?.lastElementChild;

        if (containerWhereText != null) {
            containerWhereText.innerHTML += `<div class="response">${$manualMessage.value}</div>`
        }
    }

    $manualMessage.focus();
});

$acceptAutoMessageBtn.addEventListener(`click`, async () => {
    validatingThreeFields()
        .then(async response => {
            if (response == true) {
                await showConfirmAutoMessageInformation()
                $confirmAutoMessageContainer?.classList.remove('hidden');
            }
        })
        .catch((er: string) => showError(er))
    }
);

$confirmAutoMessageBtn.addEventListener('click', async () => {
    await sendAutoMessageToEmails({
        start: $startFrom.valueAsNumber, 
        end: $endTo.valueAsNumber, 
        text: $autoMessageToSend.value
    });

    $program.classList.add('hidden');
    $confirmAutoMessageContainer.classList.add('hidden');
});

placeInfoInBothDivs();